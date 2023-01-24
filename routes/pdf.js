const express = require('express');
const PdfPrinter = require('pdfmake');
const markdown = require('markdown-it')();
const Recipe = require('../models/recipe');

const fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf',
  },
};

const router = express.Router();
const printer = new PdfPrinter(fonts);

const formatDescription = (description) => {
  const [parsed] = markdown.parseInline(description);
  const items = [];

  let item = { fontSize: 10 };
  const pushItem = () => {
    if (item.text) {
      items.push(item);
      item = { fontSize: 10 };
    }
  };

  for (const token of parsed.children) {
    if (token.type === 'text' && token.content) {
      item.text = token.content;
    } else if (token.type === 'strong_open' || token.type === 'em_open') {
      pushItem();
      item[token.type === 'strong_open' ? 'bold' : 'italics'] = true;
    } else if (token.type === 'strong_close' || token.type === 'em_close') {
      pushItem();
    } else if (token.type === 'softbreak' && item.text) {
      item.text += '\n\n';
      pushItem();
    }
  }
  pushItem();

  return items;
};

const getDoc = (recipe) => ({
  content: [
    {
      text: recipe.title, fontSize: 20, bold: true, alignment: 'center', margin: [0, 0, 0, 16],
    },
    {
      columns: [
        { width: '33%', text: 'Zutaten', style: 'subheading' },
        { width: '*', text: 'Beschreibung', style: 'subheading' },
      ],
      columnGap: 15,
    },
    {
      columns: [
        {
          width: '33%',
          ul: recipe.ingredients.map((ingr) => ({
            text: `${ingr.name}${ingr.hint ? ` (${ingr.hint})` : ''}`,
            margin: [0, 3],
            fontSize: 10,
          })),
        },
        {
          width: '*',
          text: [
            ...formatDescription(recipe.description),
            { text: `\n\nZubereitungszeit: ${recipe.duration} Minuten, Zutaten für ${recipe.servings} Portionen`, fontSize: 10 },
          ],
        },
      ],
      columnGap: 15,
    },
  ],
  styles: {
    subheading: {
      fontSize: 14,
      margin: [0, 0, 0, 12],
    },
  },
  pageMargins: [55, 30, 40, 25],
  info: {
    title: recipe.title,
  },
});

const getImageWidth = (recipe) => {
  const { description, ingredients } = recipe;
  const basedOnDescr = Math.min(240 + (((2000 / description.length) - 1) * 150), 500);
  const basedOnIngr = Math.min(500 - (((ingredients.length / 18) - 1) * 400), 500);
  return Math.min(basedOnDescr, basedOnIngr);
};

const getPdf = async (recipe) => {
  const pdf = getDoc(recipe);
  const imageWidth = getImageWidth(recipe);
  if (recipe.image && imageWidth > 200) {
    try {
      const imageRes = await fetch(recipe.image);
      const buff = await imageRes.arrayBuffer();
      const imageData = `data:${imageRes.headers.get('content-type')};base64,${Buffer.from(buff).toString('base64')}`;
      const image = {
        image: imageData, width: imageWidth, alignment: 'center', margin: [0, 0, 0, 16],
      };
      pdf.content.splice(1, 0, image);
    } catch (error) {
      console.error(error);
    }
  }
  return printer.createPdfKitDocument(pdf);
};

router.get('/recipe/:id', async (req, res) => {
  try {
    const recipe = await Recipe.getRecipeById(req.params.id);
    if (!recipe) res.status(400).send('Recipe not found');
    else {
      const pdf = await getPdf(recipe);
      res.setHeader('Content-disposition', `attachment; filename=${pdf.info.Title.replace(/\s/g, '-')}.pdf`);
      res.setHeader('Content-type', 'application/pdf');
      pdf.pipe(res);
      pdf.end();
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;

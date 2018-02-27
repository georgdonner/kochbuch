const express = require('express');
const PdfPrinter = require('pdfmake');
const request = require('request-promise-native');
const markdown = require('mark-twain');
const Recipe = require('../models/recipe');

const fonts = {
  Roboto: {
    normal: 'server/fonts/Roboto-Regular.ttf',
    bold: 'server/fonts/Roboto-Medium.ttf',
    italics: 'server/fonts/Roboto-Italic.ttf',
    bolditalics: 'server/fonts/Roboto-MediumItalic.ttf',
  },
};

const router = express.Router();
const printer = new PdfPrinter(fonts);

const formatDescription = (description) => {
  const parsed = markdown(description);
  const content = parsed.content.filter(el => el.includes('p'));
  const items = [];
  content.forEach((p) => {
    p.shift(); // remove 'p'
    p.forEach((el, index) => {
      const isLast = p.length - 1 === index;
      const item = { fontSize: 10 };
      if (Array.isArray(el)) {
        item.text = isLast ? `${el[1]}\n\n` : el[1];
        switch (el[0]) {
          case 'strong':
            item.bold = true; break;
          case 'em':
            item.italics = true; break;
          default:
            break;
        }
      } else {
        item.text = isLast ? `${el}\n\n` : el;
      }
      items.push(item);
    });
  });
  return items;
};

const getDoc = recipe => ({
  content: [
    { text: recipe.title, fontSize: 20, bold: true, alignment: 'center', margin: [0, 0, 0, 16] },
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
          ul: recipe.ingredients.map(ingr => ({
            text: `${ingr.name}${ingr.hint ? ` (${ingr.hint})` : ''}`,
            margin: [0, 3],
            fontSize: 10,
          })),
        },
        {
          width: '*',
          text: [
            formatDescription(recipe.description),
            { text: `Zubereitungszeit: ${recipe.duration} Minuten, Zutaten für ${recipe.servings} Portionen, `, fontSize: 10 },
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
  pageMargins: [40, 25],
  info: {
    title: recipe.title,
  },
});

const getPdf = async (recipe) => {
  const pdf = getDoc(recipe);
  if (recipe.heroImage) {
    try {
      const imageRes = await request.get(recipe.heroImage, {
        encoding: null,
        resolveWithFullResponse: true,
      });
      const imageData = `data:${imageRes.headers['content-type']};base64,${Buffer.from(imageRes.body).toString('base64')}`;
      const image = { image: imageData, width: 250, alignment: 'center', margin: [0, 0, 0, 16] };
      pdf.content.splice(1, 0, image);
    } catch (error) {
      console.error(error);
    }
  }
  return printer.createPdfKitDocument(pdf);
};

router.get('/recipe/:id', (req, res) => {
  Recipe.getRecipeById(req.params.id, async (err, recipe) => {
    if (err) res.status(500).send(err.message);
    else if (!recipe) res.status(400).send('Recipe not found');
    else {
      const pdf = await getPdf(recipe);
      res.setHeader('Content-disposition', `attachment; filename=${pdf.info.Title.replace(/\s/g, '-')}.pdf`);
      res.setHeader('Content-type', 'application/pdf');
      pdf.pipe(res);
      pdf.end();
    }
  });
});

module.exports = router;

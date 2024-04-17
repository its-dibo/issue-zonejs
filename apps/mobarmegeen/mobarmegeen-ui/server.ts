import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express, { Request, Response } from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

  let app = express(),
    commonEngine = new CommonEngine(),
    __dirname = dirname(fileURLToPath(import.meta.url)),
    browserDistFolder = resolve(__dirname, '../browser'),
    indexHtml = join(__dirname, 'index.server.html');

  app.set('view engine', 'html');
  app.set('views', browserDistFolder);


  // Serve static files from /browser
  app.get(
    '*.*',
    express.static(browserDistFolder, {
      maxAge: '1y',
    }),
  );



  app.get('*', (req:any, res:any, next:any) => {
    let { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [
          { provide: APP_BASE_HREF, useValue: baseUrl },
       
        ],
      })
      .then((html) => res.send(html))
      .catch((error) => next(error));
  });

app.listen(4200);

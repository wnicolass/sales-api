import handlebars from 'handlebars';
import { readFile } from 'node:fs/promises';

export interface ITemplateVariables {
  [key: string]: string | number;
}

export interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariables;
}

export class HandlebarsMailTemplate {
  public async parse({ file, variables }: IParseMailTemplate): Promise<string> {
    const templateFile = await readFile(file, { encoding: 'utf8' });
    const parsedTemplate = handlebars.compile(templateFile);
    return parsedTemplate(variables);
  }
}

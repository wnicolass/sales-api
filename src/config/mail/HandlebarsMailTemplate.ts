import handlebars from 'handlebars';

export interface ITemplateVariables {
  [key: string]: string | number;
}

export interface IParseMailTemplate {
  template: string;
  variables: ITemplateVariables;
}

export class HandlebarsMailTemplate {
  public async parse({
    template,
    variables,
  }: IParseMailTemplate): Promise<string> {
    const parsedTemplate = handlebars.compile(template);
    return parsedTemplate(variables);
  }
}

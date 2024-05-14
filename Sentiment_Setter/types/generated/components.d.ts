import type { Schema, Attribute } from '@strapi/strapi';

export interface TableTabella1 extends Schema.Component {
  collectionName: 'components_table_tabella1s';
  info: {
    displayName: 'tabella1';
  };
  attributes: {
    nome: Attribute.String;
    frase: Attribute.String;
    flag: Attribute.Boolean;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'table.tabella1': TableTabella1;
    }
  }
}

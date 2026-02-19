import type { Schema, Struct } from '@strapi/strapi';

export interface FullProfileFullProfile extends Struct.ComponentSchema {
  collectionName: 'components_full_profile_full_profiles';
  info: {
    displayName: 'full_profile';
  };
  attributes: {};
}

export interface FullProfilePara1 extends Struct.ComponentSchema {
  collectionName: 'components_full_profile_para1s';
  info: {
    displayName: 'para1';
  };
  attributes: {
    paragraph1: Schema.Attribute.Text;
    paragraph2: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'full-profile.full-profile': FullProfileFullProfile;
      'full-profile.para1': FullProfilePara1;
    }
  }
}

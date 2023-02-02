import sanityClient from '@sanity/client';

import  imageUrlBuilder  from '@sanity/image-url';

export const client=sanityClient({
    projectId:'ikvc2ll5',
    dataset:'production',
    apiVersion:'2023-01-25',
    useCdn:true,
    token:process.env.NEXT_PUBLIC_SANITY_TOKEN
});

export const urlFor =(source)=>imageUrlBuilder(client).image(source);

// NOTE This file is auto-generated by Contentlayer

export { isType } from 'contentlayer/client'

// NOTE During development Contentlayer imports from `.mjs` files to improve HMR speeds.
// During (production) builds Contentlayer it imports from `.json` files to improve build performance.
import allPosts from './Post/_index.json' assert { type: 'json' }
import allPortfolios from './Portfolio/_index.json' assert { type: 'json' }

export { allPosts, allPortfolios }

export const allDocuments = [...allPosts, ...allPortfolios]



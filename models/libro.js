import { Schema, model } from "mongoose";

let libroScheme = new Schema({
    subcategories: {
        type: ["String"],
    },
    page_count: {
        type: "Number",
    },
    title_search: {
        type: "String",
    },
    author_first_names: {
        type: ["String"],
    },
    canonical_published_work_id: {
        type: "Number",
    },
    copyright: {
        type: "Number",
    },
    title: {
        type: "String",
    },
    subject_tags: {
        type: ["String"],
    },
    cover_art_url: {
        type: "String",
    },
    author_last_names: {
        type: ["String"],
    },
    authors: {
        type: ["String"],
    },
    categories: {
        type: ["String"],
    },
    language: {
        type: "String",
    },
    summary: {
        type: "String",
    },
    work_id: {
        type: "Number",
    },
    precio: {
        type: "Number",
    },
    canonical_isbn: {
        type: "String",
    }
});

export default model('Libro', libroScheme)
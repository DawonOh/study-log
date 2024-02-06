export interface BookType {
  author_facet: string[];
  author_key: string[];
  author_name: string[];
  contributor: string[];
  cover_edition_key: string;
  cover_i: number;
  ebook_access: string;
  ebook_count_i: number;
  edition_count: number;
  edition_key: string[];
  first_publish_year: number;
  has_fulltext: boolean;
  isbn: string[];
  key: string;
  language: string[];
  last_modified_i: number;
  lcc: string[];
  lcc_sort: string;
  lccn: string[];
  number_of_pages_median: number;
  oclc: string[];
  public_scan_b: boolean;
  publish_date: string[];
  publish_year: number[];
  publisher: string[];
  publisher_facet: string[];
  seed: string[];
  subject: string[];
  subject_facet: string[];
  subject_key: string[];
  title: string;
  title_sort: string;
  title_suggest: string;
  type: string;
  _version_: number;
}

export interface BookResponseType {
  docs: BookType[];
  numFound: number;
  numFoundExact: boolean;
  num_found: number;
  offset: string | number | null;
  q: string;
  start: number;
}

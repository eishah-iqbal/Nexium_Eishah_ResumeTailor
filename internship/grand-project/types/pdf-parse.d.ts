declare module 'pdf-parse' {
  import { Buffer } from 'buffer'

  interface PDFPage {
    pageInfo: {
      num: number
    }
    getTextContent: () => Promise<any>
  }

  interface PDFData {
    numpages: number
    numrender: number
    info: any
    metadata: any
    version: string
    text: string
  }

  type PDFParse = (dataBuffer: Buffer) => Promise<PDFData>

  const pdfParse: PDFParse
  export = pdfParse
}
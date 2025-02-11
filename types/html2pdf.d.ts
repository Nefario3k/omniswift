// types/html2pdf.d.ts
declare module 'html2pdf.js' {

    interface Html2PdfInstance {
        set: (opt: Html2PdfOptions) => Html2PdfInstance;
        from: (element: HTMLElement | string) => Html2PdfInstance;
        save: () => Promise<void>;
    }

    function html2pdf(): Html2PdfInstance;
    function html2pdf(element: HTMLElement | string, opts?: Html2PdfOptions): Html2PdfInstance;

    export default html2pdf;
}
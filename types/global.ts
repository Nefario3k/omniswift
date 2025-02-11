export { };

declare global {
    interface Html2PdfOptions {
        margin?: number | [number, number, number, number];
        filename?: string;
        image?: { type: string; quality: number };
        html2canvas?: { scale?: number;[key: string]: any };
        jsPDF?: {
            unit?: string;
            format?: string;
            orientation?: 'portrait' | 'landscape';
            [key: string]: any;
        };
    }
    interface FilterFormData {
        age: number | string;
        state: string;
        level: string;
        gender: string;
    }
    interface AllData {
        id: number;
        surname: string;
        firstname: string;
        age: number;
        gender: string;
        level: string;
        state: string;
    }
    interface PdfContentBase {
        message: string;
        logo: string;
        profile_picture: string;
        data: PdfContentBaseData;
    }
    interface PdfContentBaseData {
        id: number;
        surname: string;
        firstname: string;
        age: number;
        gender: string;
        level: string;
        state: string;
        reg_no: string;
        session: string;
        result: Array<PdfContentBaseDataResult>;
        cummulative: PdfContentBaseDataCmd;
    }
    interface PdfContentBaseDataResult {
        coursecode: string;
        title: string;
        credit_unit: number;
        grade: string;
        total_point: number;
    }
    interface PdfContentBaseDataCmd {
        unts: number;
        untd: number;
        gpts: number;
        gptd: number;
        gpats: number;
        gpatd: number;
        remarks: string;
    }

}
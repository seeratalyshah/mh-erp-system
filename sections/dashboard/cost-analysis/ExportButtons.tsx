import { FileExcelOutlined, FilePdfOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";

export const ExportButtons = ({
  rows,
  avg,
  lowest,
}: {
  rows: any[];
  avg: number;
  lowest: string;
}) => {
  const exportExcel = async () => {
    const XLSX = await import("xlsx");
    const FileSaver = await import("file-saver");

    /* build workbook */
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Quotations");

    /* binary string */
    const bin = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
    const buf = new ArrayBuffer(bin.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < bin.length; ++i) view[i] = bin.charCodeAt(i) & 0xff;

    /* blob */
    const blob = new Blob([buf], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    /* choose the right saveAs */
    const saveAs =
      (FileSaver as any).saveAs || (FileSaver as any).default?.saveAs;

    if (typeof saveAs === "function") {
      saveAs(blob, "quotations.xlsx");
    } else {
      console.error("file-saver: saveAs not found");
    }
  };

  const exportPDF = async () => {
    const jsPDF = (await import("jspdf")).default;
    const autoTable = (await import("jspdf-autotable")).default;

    const doc = new jsPDF();
    doc.text("Quotation Comparison", 14, 16);

    autoTable(doc, {
      startY: 22,
      head: [["Vendor", "Quotation", "Delivery", "Additional", "Total"]],
      body: rows.map((r) => [
        r.vendor,
        `$${r.quotationAmount}`,
        `${r.deliveryTime} d`,
        `$${r.additionalCosts}`,
        `$${r.totalCost}`,
      ]),

      // —— highlight lowest row ——
      willDrawCell: (data) => {
        const raw = data.row.raw; // RowInput | HTMLTableRowElement

        /* safe extraction of vendor string ------------------------- */
        let vendor: string | undefined;

        if (Array.isArray(raw)) {
          // our body rows are arrays → vendor is first col
          vendor = raw[0] as string;
        } else if (raw && typeof raw === "object" && "vendor" in raw) {
          // if we ever pass objects instead
          vendor = (raw as any).vendor;
        }

        /* highlight logic ------------------------------------------ */
        if (vendor === lowest) {
          doc.setFillColor(82, 196, 26); // green
          doc.setTextColor(255, 255, 255); // white text
        }
      },
    });

    const endY = doc.lastAutoTable.finalY;
    doc.text(`Average quote: $${avg.toLocaleString()}`, 14, endY + 10);
    doc.save("quotations.pdf");
  };

  return (
    <Row gutter={8}>
      <Col>
        <Button
          type="primary"
          icon={<FileExcelOutlined />}
          onClick={exportExcel}
        >
          Excel
        </Button>
      </Col>
      <Col>
        <Button type="primary" icon={<FilePdfOutlined />} onClick={exportPDF}>
          PDF
        </Button>
      </Col>
    </Row>
  );
};

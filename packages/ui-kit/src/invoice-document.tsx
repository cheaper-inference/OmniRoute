import type { ComponentProps } from "react";
import { resolveLabels } from "./lib/labels";
import { cn } from "./lib/utils";

export interface InvoiceDocumentParty {
  name: string;
  lines: string[];
}
/** Fixed text of the invoice. Amounts, dates, tax and bank rows come from the data props. */
export interface InvoiceDocumentLabels {
  /** Accessible name of the document; a native `aria-label` still takes precedence. */
  document: string;
  invoice: string;
  draftInvoice: string;
  /** Under the invoice number of a draft. */
  draftNote: string;
  /** Under the invoice number of an issued invoice. */
  paymentMethod: string;
  from: string;
  billTo: string;
  /** Placeholder for a party without a name. */
  companyName: string;
  issued: string;
  due: string;
  reference: string;
  /** Hidden caption of the line-item table. */
  lineItems: string;
  description: string;
  quantity: string;
  unitPrice: string;
  amount: string;
  /** Placeholder for a line without a description. */
  lineItem: string;
  subtotal: string;
  amountDue: string;
  paymentInstructions: string;
  /** Sentence under the payment details, from `invoiceNumber`. */
  paymentReference: (invoiceNumber: string) => string;
  customerBankDetails: string;
  notes: string;
  thanks: string;
}
export const defaultInvoiceDocumentLabels: InvoiceDocumentLabels = {
  document: "Invoice preview",
  invoice: "INVOICE",
  draftInvoice: "DRAFT INVOICE",
  draftNote: "Preview · not issued",
  paymentMethod: "Payment by bank transfer",
  from: "From",
  billTo: "Bill to",
  companyName: "Company name",
  issued: "Issued",
  due: "Due",
  reference: "PO / reference",
  lineItems: "Invoice line items",
  description: "Description",
  quantity: "Qty",
  unitPrice: "Unit price",
  amount: "Amount",
  lineItem: "Line item",
  subtotal: "Subtotal",
  amountDue: "Amount due",
  paymentInstructions: "Wire payment instructions",
  paymentReference: (invoiceNumber) => `Include ${invoiceNumber} as the payment reference.`,
  customerBankDetails: "Customer bank details",
  notes: "Notes",
  thanks: "Thank you for your business.",
};

export interface InvoiceDocumentProps extends ComponentProps<"article"> {
  brand?: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  reference?: string;
  seller: InvoiceDocumentParty;
  customer: InvoiceDocumentParty;
  items: { description: string; quantity: string; unitPrice: string; amount: string }[];
  subtotal: string;
  tax?: { label: string; amount: string };
  total: string;
  paymentDetails: { label: string; value: string }[];
  customerBankDetails?: { label: string; value: string }[];
  notes?: string;
  draft?: boolean;
  /** Localized fixed text; missing or `undefined` keys fall back to defaultInvoiceDocumentLabels. */
  labels?: Partial<InvoiceDocumentLabels>;
}

/** A paper invoice, with the same readable document surface in either app theme. */
export function InvoiceDocument({ brand = "Cheaper Inference", invoiceNumber, issueDate, dueDate,
  reference, seller, customer, items, subtotal, tax, total, paymentDetails, customerBankDetails,
  notes, draft = false, labels: labelOverrides, className, ...props }: InvoiceDocumentProps) {
  const labels = resolveLabels(defaultInvoiceDocumentLabels, labelOverrides);
  return <article className={cn("ci-invoice", className)} aria-label={labels.document} {...props}>
    <header className="ci-invoice__header">
      <div><div className="ci-invoice__brand">{brand}</div><p className="ci-invoice__eyebrow">{draft ? labels.draftInvoice : labels.invoice}</p></div>
      <div className="ci-invoice__number"><strong>{invoiceNumber}</strong><span>{draft ? labels.draftNote : labels.paymentMethod}</span></div>
    </header>
    <div className="ci-invoice__parties">
      {([["from", seller], ["billTo", customer]] as const).map(([role, party]) => <section key={role}>
        <h3>{labels[role]}</h3><strong>{party.name || labels.companyName}</strong>
        {party.lines.filter(Boolean).map((line, i) => <p key={i}>{line}</p>)}
      </section>)}
    </div>
    <dl className="ci-invoice__dates">
      <div><dt>{labels.issued}</dt><dd>{issueDate}</dd></div><div><dt>{labels.due}</dt><dd>{dueDate}</dd></div>
      {reference && <div><dt>{labels.reference}</dt><dd>{reference}</dd></div>}
    </dl>
    <div className="ci-invoice__table-wrap"><table><caption className="ci-sr-only">{labels.lineItems}</caption>
      <thead><tr><th scope="col">{labels.description}</th><th scope="col">{labels.quantity}</th><th scope="col">{labels.unitPrice}</th><th scope="col">{labels.amount}</th></tr></thead>
      <tbody>{items.map((item, i) => <tr key={i}><td>{item.description || labels.lineItem}</td><td>{item.quantity}</td><td>{item.unitPrice}</td><td>{item.amount}</td></tr>)}</tbody>
    </table></div>
    <dl className="ci-invoice__totals"><div><dt>{labels.subtotal}</dt><dd>{subtotal}</dd></div>
      {tax && <div><dt>{tax.label}</dt><dd>{tax.amount}</dd></div>}
      <div className="ci-invoice__total"><dt>{labels.amountDue}</dt><dd>{total}</dd></div>
    </dl>
    <section className="ci-invoice__payment"><h3>{labels.paymentInstructions}</h3>
      <dl>{paymentDetails.filter(row => row.value).map(row => <div key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}</dl>
      <p>{labels.paymentReference(invoiceNumber)}</p>
    </section>
    {!!customerBankDetails?.some(row => row.value) && <section className="ci-invoice__customer-bank"><h3>{labels.customerBankDetails}</h3>
      <dl>{customerBankDetails.filter(row => row.value).map(row => <div key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}</dl>
    </section>}
    {notes && <section className="ci-invoice__notes"><h3>{labels.notes}</h3><p>{notes}</p></section>}
    <footer className="ci-invoice__footer">{labels.thanks}<span>{brand}</span></footer>
  </article>;
}

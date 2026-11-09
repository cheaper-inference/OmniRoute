import type { ComponentProps } from "react";
import { cn } from "./lib/utils";

export interface InvoiceDocumentParty {
  name: string;
  lines: string[];
}
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
}

/** A paper invoice, with the same readable document surface in either app theme. */
export function InvoiceDocument({ brand = "Cheaper Inference", invoiceNumber, issueDate, dueDate,
  reference, seller, customer, items, subtotal, tax, total, paymentDetails, customerBankDetails,
  notes, draft = false, className, ...props }: InvoiceDocumentProps) {
  return <article className={cn("ci-invoice", className)} aria-label="Invoice preview" {...props}>
    <header className="ci-invoice__header">
      <div><div className="ci-invoice__brand">{brand}</div><p className="ci-invoice__eyebrow">{draft ? "DRAFT INVOICE" : "INVOICE"}</p></div>
      <div className="ci-invoice__number"><strong>{invoiceNumber}</strong><span>{draft ? "Preview · not issued" : "Payment by bank transfer"}</span></div>
    </header>
    <div className="ci-invoice__parties">
      {([["From", seller], ["Bill to", customer]] as const).map(([label, party]) => <section key={label}>
        <h3>{label}</h3><strong>{party.name || "Company name"}</strong>
        {party.lines.filter(Boolean).map((line, i) => <p key={i}>{line}</p>)}
      </section>)}
    </div>
    <dl className="ci-invoice__dates">
      <div><dt>Issued</dt><dd>{issueDate}</dd></div><div><dt>Due</dt><dd>{dueDate}</dd></div>
      {reference && <div><dt>PO / reference</dt><dd>{reference}</dd></div>}
    </dl>
    <div className="ci-invoice__table-wrap"><table><caption className="ci-sr-only">Invoice line items</caption>
      <thead><tr><th scope="col">Description</th><th scope="col">Qty</th><th scope="col">Unit price</th><th scope="col">Amount</th></tr></thead>
      <tbody>{items.map((item, i) => <tr key={i}><td>{item.description || "Line item"}</td><td>{item.quantity}</td><td>{item.unitPrice}</td><td>{item.amount}</td></tr>)}</tbody>
    </table></div>
    <dl className="ci-invoice__totals"><div><dt>Subtotal</dt><dd>{subtotal}</dd></div>
      {tax && <div><dt>{tax.label}</dt><dd>{tax.amount}</dd></div>}
      <div className="ci-invoice__total"><dt>Amount due</dt><dd>{total}</dd></div>
    </dl>
    <section className="ci-invoice__payment"><h3>Wire payment instructions</h3>
      <dl>{paymentDetails.filter(row => row.value).map(row => <div key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}</dl>
      <p>Include {invoiceNumber} as the payment reference.</p>
    </section>
    {!!customerBankDetails?.some(row => row.value) && <section className="ci-invoice__customer-bank"><h3>Customer bank details</h3>
      <dl>{customerBankDetails.filter(row => row.value).map(row => <div key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}</dl>
    </section>}
    {notes && <section className="ci-invoice__notes"><h3>Notes</h3><p>{notes}</p></section>}
    <footer className="ci-invoice__footer">Thank you for your business.<span>{brand}</span></footer>
  </article>;
}

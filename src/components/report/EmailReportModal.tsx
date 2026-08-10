"use client";

import { useState } from "react";
import { Mail, Send, X, Check, Paperclip } from "lucide-react";

export function EmailReportModal({
  reportId,
  reportNumber,
  defaultEmail = "",
  patientName = "",
}: {
  reportId: string;
  reportNumber: string;
  defaultEmail?: string;
  patientName?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState(defaultEmail || "naseeraslamkhan016@gmail.com");
  const [sending, setSending] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSendEmail(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError(null);
    setStatusMsg(null);

    try {
      const res = await fetch("/api/reports/email-dispatch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportId, recipientEmail: email }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error || "Failed to dispatch email.");
        setSending(false);
        return;
      }

      setStatusMsg(`✅ Verified PDF Report ${reportNumber} successfully attached & sent to ${email}!`);
      setTimeout(() => {
        setIsOpen(false);
        setStatusMsg(null);
      }, 3000);
    } catch (err: any) {
      setError("Network connection error.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-3.5 py-2 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-teal-800 dark:text-teal-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
      >
        <Mail className="w-4 h-4 text-teal-600 dark:text-teal-400" /> Email PDF Attachment
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-teal-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl animate-in zoom-in-95 duration-200 text-slate-900 dark:text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Mail className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Email PDF Report Attachment</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Directly attach verified PDF to recipient email</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {statusMsg && (
              <div className="p-3.5 bg-teal-500/10 border border-teal-500/30 rounded-xl text-teal-700 dark:text-teal-300 text-xs font-bold flex items-center gap-2">
                <Check className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>{statusMsg}</span>
              </div>
            )}

            {error && (
              <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-600 dark:text-rose-300 text-xs font-semibold">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSendEmail} className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase">Report Details</div>
                <div className="font-bold text-slate-900 dark:text-slate-100">{patientName || "Patient Report"}</div>
                <div className="font-mono text-teal-700 dark:text-teal-400 font-semibold">{reportNumber}</div>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 dark:text-emerald-400 font-bold pt-1">
                  <Paperclip className="w-3 h-3" /> Attached: <code>LAB-Report-{reportNumber}.pdf</code>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Recipient Email Address *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="e.g. patient@gmail.com or doctor@clinic.com"
                  className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-mono font-bold focus:border-teal-500 outline-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-400 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={sending}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-sky-400 text-slate-950 font-bold shadow-lg shadow-teal-500/20 hover:from-teal-300 hover:to-sky-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-4 h-4 fill-slate-950" />
                  <span>{sending ? "Attaching & Dispatching..." : "Send Email with PDF Attachment"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

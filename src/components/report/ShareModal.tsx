"use client";

import { useState } from "react";
import { Share2, Lock, Clock, Check, Copy, ShieldAlert, KeyRound, X } from "lucide-react";

export function ShareModal({ reportId, reportNumber }: { reportId: string; reportNumber: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [durationHours, setDurationHours] = useState("168"); // Default 7 days
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [shareData, setShareData] = useState<{ shareUrl: string; shareToken: string; expiresAt: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [revoked, setRevoked] = useState(false);

  async function handleGenerateShare() {
    setLoading(true);
    try {
      const res = await fetch(`/api/reports/${reportId}/share`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ durationHours: Number(durationHours), pin }),
      });
      const data = await res.json();
      if (data.success) {
        const fullUrl = `${window.location.origin}${data.share.shareUrl}`;
        setShareData({
          shareUrl: fullUrl,
          shareToken: data.share.shareToken,
          expiresAt: data.share.expiresAt,
        });
        setRevoked(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleRevoke() {
    if (!shareData) return;
    try {
      const res = await fetch(`/api/reports/${reportId}/share`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shareToken: shareData.shareToken }),
      });
      const data = await res.json();
      if (data.success) {
        setRevoked(true);
      }
    } catch (err) {
      console.error(err);
    }
  }

  function handleCopy() {
    if (!shareData) return;
    navigator.clipboard.writeText(shareData.shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-teal-400 to-sky-400 text-slate-950 font-bold text-xs hover:from-teal-300 hover:to-sky-300 transition-all shadow-md shadow-teal-500/20 flex items-center gap-1.5"
      >
        <Share2 className="w-4 h-4 fill-slate-950" /> Share Secure Access
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                <Share2 className="w-4 h-4 text-teal-400" /> Secure Report Sharing
              </div>
              <h2 className="text-xl font-bold text-slate-100">Share Report {reportNumber}</h2>
              <p className="text-xs text-slate-400">
                Generate a time-limited signed access link for doctors or patients with instant revocation.
              </p>
            </div>

            {!shareData ? (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-teal-400" /> Link Duration / Expiration
                  </label>
                  <select
                    value={durationHours}
                    onChange={(e) => setDurationHours(e.target.value)}
                    className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 font-semibold focus:border-teal-500 outline-none"
                  >
                    <option value="24">24 Hours Access</option>
                    <option value="168">7 Days Access (Recommended)</option>
                    <option value="720">30 Days Access</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
                    <KeyRound className="w-3.5 h-3.5 text-sky-400" /> Security PIN (Optional)
                  </label>
                  <input
                    type="password"
                    maxLength={6}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Enter 4-6 digit PIN (Optional)"
                    className="w-full p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 font-mono focus:border-teal-500 outline-none"
                  />
                </div>

                <button
                  onClick={handleGenerateShare}
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-400 to-sky-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 hover:from-teal-300 hover:to-sky-300 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? "Generating Signed Token..." : "Create Time-Limited Share Link"}
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                {revoked ? (
                  <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-center space-y-2">
                    <ShieldAlert className="w-6 h-6 text-rose-400 mx-auto" />
                    <div className="font-bold text-rose-300 text-sm">Share Link Revoked</div>
                    <p className="text-[11px] text-slate-400">
                      This access token has been revoked immediately. Anyone attempting to access it will be blocked.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Active Secure Share Link</div>
                      <div className="p-2 bg-slate-900 rounded border border-slate-800 text-teal-300 font-mono text-[11px] break-all">
                        {shareData.shareUrl}
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1">
                        <span>Expires: {new Date(shareData.expiresAt).toLocaleDateString()}</span>
                        <span className="text-teal-400 font-bold">STATUS: ACTIVE</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopy}
                        className="flex-1 py-3 rounded-xl bg-teal-400 text-slate-950 font-bold flex items-center justify-center gap-2 hover:bg-teal-300 transition-colors"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? "Link Copied!" : "Copy Share Link"}
                      </button>

                      <button
                        onClick={handleRevoke}
                        className="px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 font-bold hover:bg-rose-500/20 transition-colors"
                      >
                        Revoke Access
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

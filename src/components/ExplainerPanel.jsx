/**
 * ExplainerPanel — shared in-game concept explainer card.
 *
 * Props:
 *   title          string      — concept heading
 *   body           string|JSX  — plain-language explanation (1–3 sentences)
 *   example        string|JSX  — worked example (shown in shaded box)
 *   visual         JSX         — optional visual aid (bar, emoji row, table…)
 *   callout        string|JSX  — optional highlighted amber note
 *   furtherReading string|JSX  — optional "Further Reading" appendix with formal name
 *   accentColor    string      — Tailwind border-color class, e.g. "border-violet-500"
 */
export default function ExplainerPanel({ title, body, example, visual, callout, furtherReading, accentColor = 'border-violet-400' }) {
  return (
    <div className={`bg-white rounded-3xl p-5 shadow-sm border-s-4 ${accentColor} my-6`}>
      <h3 className="font-extrabold text-gray-800 text-base mb-2">💡 {title}</h3>

      {body && (
        <p className="text-gray-600 text-sm leading-relaxed mb-3">{body}</p>
      )}

      {visual && (
        <div className="mb-3">{visual}</div>
      )}

      {example && (
        <div className="bg-gray-50 rounded-2xl px-4 py-3 text-sm text-gray-700 leading-relaxed">
          {example}
        </div>
      )}

      {callout && (
        <div className="mt-3 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 text-sm text-amber-800 leading-relaxed">
          ⭐ {callout}
        </div>
      )}

      {furtherReading && (
        <div className="mt-3 pt-3 border-t border-dashed border-gray-200 text-xs text-gray-400 leading-relaxed">
          📚 {furtherReading}
        </div>
      )}
    </div>
  )
}

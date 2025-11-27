import React from 'react'

const OrganizationIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <line x1="10" y1="9" x2="8" y2="9"></line>
  </svg>
)

const WorkIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
    <path d="M16 2L8 2c-1.1 0-2 .9-2 2v3h12V4c0-1.1-.9-2-2-2z"></path>
  </svg>
)

export default function Experiences({ experiences }) {
  const formatDate = (d) => {
    if (!d) return 'Present'
    try {
      const dt = new Date(d)
      return dt.toLocaleString('id-ID', { month: 'short', year: 'numeric' })
    } catch (e) {
      return d
    }
  }

  // --- UPDATE DI SINI: Membedakan warna tapi tetap dalam satu tone hangat ---
  const getTypeClasses = (type) => {
    switch (type) {
      case 'project':
        return {
          // Warna AMBER/ORANGE (Emas) untuk Project -> Simbol Kreativitas
          bg: 'bg-orange-100',
          text: 'text-orange-800',
          label: 'project',
          iconBg: 'bg-orange-500',
          iconText: 'text-white',
          ringColor: 'ring-orange-400'
        }
      case 'organization':
        // Warna ROSE (Merah Mawar) untuk Organization -> Simbol Formal & Sosial
        return {
          bg: 'bg-rose-100',
          text: 'text-rose-800',
          label: 'organization',
          iconBg: 'bg-rose-600',
          iconText: 'text-white',
          ringColor: 'ring-rose-400'
        }
      case 'internship':
        // Warna RED (Merah Bata) untuk Internship -> Simbol Pekerjaan
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          label: 'internship',
          iconBg: 'bg-red-600',
          iconText: 'text-white',
          ringColor: 'ring-red-400'
        }
      default:
        // Warna SLATE (Abu-abu) untuk default
        return {
          bg: 'bg-slate-100',
          text: 'text-slate-700',
          label: type || 'experience',
          iconBg: 'bg-slate-600',
          iconText: 'text-white',
          ringColor: 'ring-slate-400'
        }
    }
  }

  const getIcon = (type) => {
    const iconSize = "w-4 h-4"
    if (type === 'organization') {
      return <OrganizationIcon className={iconSize} />
    }
    return <WorkIcon className={iconSize} />
  }

  return (
    <section className="bg-white shadow-md p-6 rounded-xl mt-6">
      <h2 className="text-xl font-bold mb-4">Experience</h2>

      <div className="relative ps-2">
        {experiences.map((exp, i) => {
          const type = exp.type || exp.experience_type || 'experience'
          const classes = getTypeClasses(type)
          const isCurrent = exp.end === null || exp.end_date === null

          return (
            <div key={i} className="relative pb-8 last:pb-0">
              {/* Garis vertikal */}
              {i < experiences.length - 1 && (
                <div className="absolute top-2 left-3.5 w-0.5 h-full bg-gray-200 z-0"></div>
              )}

              <div className="flex items-start gap-4 relative z-10">

                {/* Bagian Ikon */}
                <div className="flex-shrink-0 relative mt-1">
                  <div className={`
                    w-7 h-7 rounded-full grid place-items-center shadow-sm border-2 border-white
                    ${classes.iconBg} ${classes.iconText}
                    /* Ring dinamis mengikuti warna kategori */
                    ${isCurrent ? `ring-2 ring-offset-1 ${classes.ringColor}` : ''}
                  `}>
                    {getIcon(type)}
                  </div>
                </div>

                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-base md:text-lg leading-tight">{exp.role || exp.title}</h3>

                    {/* Badge Kategori */}
                    <span className={`flex-shrink-0 px-2 py-0.5 text-xs rounded-full capitalize font-medium
                      ${classes.bg} ${classes.text} ml-4`}>
                      {classes.label}
                    </span>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center md:gap-4 text-sm mt-0.5 text-gray-600">
                    <span className="font-medium">{exp.company || exp.organization}</span>
                    <span className="text-gray-500 mt-1 md:mt-0">
                      {formatDate(exp.start || exp.start_date)} — {formatDate(exp.end || exp.end_date)}

                      {/* Badge "Current" (Status Aktif) */}
                      {isCurrent && <span className={`ml-1 px-1.5 py-0.5 text-xs rounded-full ${classes.iconBg} text-white font-semibold`}>Current</span>}
                    </span>
                  </div>

                  <p className="mt-2 text-gray-700 text-sm leading-relaxed">{exp.description}</p>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {(exp.tags || exp.technologies || []).map((t, j) => (
                      <span key={j} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
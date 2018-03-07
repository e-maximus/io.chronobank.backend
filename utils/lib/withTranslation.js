class Language {
  constructor (name, title, solrTypeSuffix) {
    this.name = name
    this.title = title
    this.solrTypeSuffix = solrTypeSuffix
  }
}

const withTranslation = (...languages) => (schema) => {
  const target = {
    i18nTranslations: { type: String, hidden: true, label: 'Translations' },
    i18n: languages.reduce((t, l) => ({
      ...t,
      [l.name]: {
        active: { type: Boolean, label: `Translate to ${l.title}` },
        overrides: {}
      }
    }), {})
  }

  for (const l of languages) {
    for (const [k, v] of Object.entries(schema)) {
      const p = {
        ...v,
        dependsOn: Object.assign({}, v.dependsOn, {
          [`i18n.${l.name}.active`]: true
        })
      }
      if ('title' in v) {
        p.title = `${v.title} (${l.title})`
      }
      target.i18n[l.name].overrides[k] = p
    }
  }
  return target
}

const LANGUAGE_CN = new Language('cn', 'Chinese', 'txt_cjk')
const LANGUAGE_RU = new Language('ru', 'Russian', 'txt_ru')
const LANGUAGE_DE = new Language('de', 'German', 'txt_de')
const LANGUAGE_KO = new Language('ko', 'Korean', 'txt_cjk')
const LANGUAGE_JA = new Language('ja', 'Japanese', 'txt_ja')
const LANGUAGE_MS = new Language('ms', 'Malaysia', 'txt')
const LANGUAGE_TH = new Language('th', 'Thai', 'txt_th')
const LANGUAGE_ES = new Language('es', 'Spanish', 'txt_es')
const LANGUAGE_VI = new Language('vi', 'Vietnamese', 'txt')
const LANGUAGE_AR = new Language('ar', 'Arabian', 'txt_ar')

const LANGUAGES_ARRAY = [
  LANGUAGE_CN,
  LANGUAGE_RU,
  LANGUAGE_DE,
  LANGUAGE_KO,
  LANGUAGE_JA,
  LANGUAGE_MS,
  LANGUAGE_TH,
  LANGUAGE_ES,
  LANGUAGE_VI,
  LANGUAGE_AR
]

const LANGUAGES_MAP = LANGUAGES_ARRAY.reduce((target, value) => ({
  ...target,
  [value.name]: value,
}), {})

const withSolrIndex = (...languages) => (doc, getters) => {
  const target = {}
  if (doc.i18n) {
    for (const lang of languages) {
      if (lang.solrTypeSuffix) {
        const i18nData = doc.i18n[lang.name]
        for (const [field, getter] of Object.entries(getters)) {
          const value = i18nData && i18nData.active && i18nData.overrides
            ? getter(i18nData.overrides)
            : getter(doc)
          target[`${field}_${lang.name}_${lang.solrTypeSuffix}`] = value
        }
      }
    }
  }
  return target
}

module.exports = {
  LANGUAGES_ARRAY,
  LANGUAGES_MAP,
  withTranslation,
  withSolrIndex,
  withAllSolrIndices: withSolrIndex(...LANGUAGES_ARRAY),
  withAllTranslations: withTranslation(...LANGUAGES_ARRAY),
}

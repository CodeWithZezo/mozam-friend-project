// Some hosts (shared hosting deploy pipelines in particular) strip the
// executable bit from files when they upload/extract node_modules, which
// breaks Prisma's native engine binaries with EACCES at build/migrate time.
// This best-effort pass chmods any Prisma engine binary it finds back to
// executable. It never throws — if it can't fix permissions (e.g. a
// genuinely noexec filesystem), the build continues and fails at the
// original step with the original error, same as before this script existed.

const fs = require('fs')
const path = require('path')

const ENGINE_NAME_PATTERN = /^(schema-engine|query-engine|libquery_engine)-/

function walk(dir, depth) {
  if (depth < 0) return
  let entries
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true })
  } catch {
    return
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(full, depth - 1)
    } else if (entry.isFile() && ENGINE_NAME_PATTERN.test(entry.name)) {
      try {
        fs.chmodSync(full, 0o755)
        console.log(`[fix-engine-perms] chmod +x ${full}`)
      } catch (err) {
        console.warn(`[fix-engine-perms] could not chmod ${full}: ${err.message}`)
      }
    }
  }
}

const searchRoots = [
  path.join(__dirname, '..', 'node_modules', '@prisma'),
  path.join(__dirname, '..', 'node_modules', '.prisma'),
]

for (const root of searchRoots) {
  walk(root, 3)
}

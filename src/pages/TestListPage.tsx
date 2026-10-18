import { useMemo } from 'react'
import { Link } from 'react-router'
import { generateVariants } from '../lib/combinations.ts'
import { loadTests } from '../lib/storage.ts'

export default function TestListPage() {
  const tests = useMemo(() => loadTests(), [])

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold">🔀 Plot Twist</h1>
      <p className="mt-2 text-stone-700">Find out which version your readers love.</p>
      <Link to="/tests/new" className="mt-6 inline-block rounded bg-stone-900 px-5 py-2 font-semibold text-white">
        + New test
      </Link>

      {tests.length === 0 ? (
        <p className="mt-8 text-stone-700">No tests yet. Create your first one!</p>
      ) : (
        <ul className="mt-8 space-y-3">
          {tests.map((test) => (
            <li key={test.id} className="flex flex-wrap items-center gap-3 rounded-lg border border-stone-300 bg-white p-4">
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold">{test.name}</h2>
                <p className="text-sm text-stone-700">
                  {generateVariants(test.id, test.options).length} versions · {test.status} ·{' '}
                  {new Date(test.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Link to={`/tests/${test.id}/preview`} className="text-blue-800 underline">
                Sneak Peek
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

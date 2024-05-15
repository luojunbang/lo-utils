const https = require('https')
const util = require('node:util')
const exec = util.promisify(require('node:child_process').exec)

const { github_token, GITHUB_REPOSITORY, GITHUB_SHA, GITHUB_REPOSITORY_OWNER } = process.env

async function request(url, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      url,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${github_token}`,
          'User-Agent': 'Awesome-Octocat-App',
          'X-GitHub-Api-Version': '2022-11-28',
        },
        method: 'POST',
      },
      (res) => {
        let responseData = ''

        res.on('data', (chunk) => {
          responseData += chunk
        })

        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: JSON.parse(responseData),
          })
        })
      },
    )

    req.on('error', (error) => {
      console.log('error:', error)
      reject(error)
    })
    if (data) {
      req.write(JSON.stringify(data))
    }
    req.end()
  })
}

const baseUrl = `https://api.github.com/repos/${GITHUB_REPOSITORY}/git`

const createTag = (tag, sha, message) => {
  return request(`${baseUrl}/tags`, {
    tag,
    message,
    object: sha,
    type: 'commit',
    tagger: { name: GITHUB_REPOSITORY_OWNER, email: `${GITHUB_REPOSITORY_OWNER}@gmail.com` },
  })
}

const createRef = async (tag, sha) => {
  return request(`${baseUrl}/refs`, { ref: `refs/tags/${tag}`, sha })
}

;(async () => {
  const PACKAGE_NAME = process.env.PACKAGE_NAME || 'utils'
  console.log(`\n Current release package is ${PACKAGE_NAME} \n`)

  await exec('git fetch --tags')

  let { stdout: lastVersion } = await exec(`git tag -l "${PACKAGE_NAME}/*" | sort -rV | head -n 1`)
  lastVersion = lastVersion.trim()
  const _idx = lastVersion.lastIndexOf('.')

  const nextVersion = `${lastVersion.slice(0, _idx)}.${+lastVersion.slice(_idx + 1) + 1}`
  console.log(`\n Generate next version ${nextVersion} \n`)

  const { stdout: changlog } = await exec(`git log "${lastVersion}..HEAD" --format='%s' --invert-grep --grep='^release'`)
  console.log('changlog:\n', changlog, '\n')

  const { data: tagData } = await createTag(nextVersion, GITHUB_SHA, changlog)
  console.log('SHA:', tagData.sha)

  const { data } = await createRef(nextVersion, tagData.sha)
  console.log('data:', data)
})()

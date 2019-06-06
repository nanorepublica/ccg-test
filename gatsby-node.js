const _ = require(`lodash`)
const path = require("path")

// This function is adapted from gatsby-transformer-json
// This now allows us to create pages or query data during the build.
exports.onCreateNode = async ({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  createContentDigest,
}) => {
  function getType({ node, object, isArray }) {
    if (node.internal.type !== `File`) {
      return _.upperFirst(_.camelCase(`${node.internal.type} Json`))
    } else if (isArray) {
      return _.upperFirst(_.camelCase(`${node.name} Json`))
    } else {
      return _.upperFirst(_.camelCase(`${path.basename(node.dir)} Json`))
    }
  }

  function transformObject(obj, id, type) {
    const jsonNode = {
      ...obj,
      id,
      pk: obj.id,
      children: [],
      parent: node.id,
      internal: {
        contentDigest: createContentDigest(obj),
        type,
      },
    }
    createNode(jsonNode)
    createParentChildLink({ parent: node, child: jsonNode })
  }
  const { createNode, createParentChildLink } = actions
  // We only care about JSON content.
  if (node.internal.mediaType !== `application/json`) {
    return
  }

  const content = await loadNodeContent(node)
  const parsedContent = JSON.parse(content)

  if (_.isArray(parsedContent)) {
    var i = 0
    while (i < parsedContent.length) {
      var obj = parsedContent[i]
      i++
      transformObject(
        obj,
        obj.id && typeof obj.id === "string"
          ? obj.id
          : createNodeId(`${node.id} [${i}] >>> JSON`),
        getType({ node, object: obj, isArray: true })
      )
      console.log(i)
    }
  } else if (_.isPlainObject(parsedContent)) {
    transformObject(
      parsedContent,
      parsedContent.id && typeof parsedContent.id === "string"
        ? parsedContent.id
        : createNodeId(`${node.id} >>> JSON`),
      getType({ node, object: parsedContent, isArray: false })
    )
  }
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allUsersJson {
          edges {
            node {
              pk
            }
          }
        }
        allPatientsJson {
          edges {
            node {
              userId
              pk
            }
          }
        }
      }
    `).then(result => {
      result.data &&
        result.data.allUsersJson.edges.forEach(({ node }) => {
          var user = node
          createPage({
            path: `/app/user/${user.pk}`,
            component: path.resolve("src/templates/dashboard.js"),
            context: {
              // Data passed to context is available
              // in page queries as GraphQL variables.
              userID: user.pk,
            },
          })
          result.data.allPatientsJson.edges.forEach(({ node }) => {
            var patient = node
            if (user.pk === patient.userId) {
              createPage({
                path: `/app/user/${user.pk}/patient/${patient.pk}`,
                component: path.resolve("src/templates/dashboard.js"),
                context: {
                  // Data passed to context is available
                  // in page queries as GraphQL variables.
                  userID: user.pk,
                  patientId: patient.pk,
                },
              })
            }
          })
        })
      resolve()
    })
  })
}

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/app/)) {
    page.matchPath = "/app/*"

    // Update the page.
    createPage(page)
  }
}

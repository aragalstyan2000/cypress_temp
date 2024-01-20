describe('template spec', () => {
  it('API tests', () => {

    //CREATE
    const randomData = Date.now().toString()
    cy.request({
      url: "https://api.paste.ee/v1/pastes",
      method: "POST",
      body: {"encrypted": false, "description":"test","sections":
            [{"name":"Section1","syntax":"autodetect","contents":randomData}]},
      headers: {
        "X-Auth-Token": "uDyhfItO6Kqmv6moGJlaz6RvoYZWETQxgFpyXEvoV"
      }
    }).then(response => {
      expect(response.status).to.eq(201)
      const id = response.body.id

      //GET
      cy.request({
        url: `https://api.paste.ee/v1/pastes/${id}`,
        method: "GET",
        headers: {
          "X-Auth-Token": "uDyhfItO6Kqmv6moGJlaz6RvoYZWETQxgFpyXEvoV"
        }
      }).then(response => {
        expect(response.body.paste.id).to.not.be.null
        expect(response.body.paste.id).to.eq(id)
        expect(response.body.paste.description).to.eq("test")
        expect(response.body.paste.sections[0].contents).to.eq(randomData)
      })

      //DELETE
      cy.request({
        url: `https://api.paste.ee/v1/pastes/${id}`,
        method: "DELETE",
        headers: {
          "X-Auth-Token": "uDyhfItO6Kqmv6moGJlaz6RvoYZWETQxgFpyXEvoV"
        }
      }).then(response => {
        expect(response.body.success).to.be.true
      })

    })
  })
})
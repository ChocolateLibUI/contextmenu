/// <reference types="cypress" />
import * as contextMenu from "../../src"

describe('Tests', () => {
  it('Instancing', () => {
    expect(new contextMenu.Devider).to.instanceOf(contextMenu.Devider);
    expect(new contextMenu.Option('test', () => { })).to.instanceOf(contextMenu.Option);
    expect(new contextMenu.Submenu('test', [])).to.instanceOf(contextMenu.Submenu);
  })
})
/// <reference types="cypress" />
let testData = require('../fixtures/testData.json')
let testbooks = require('../fixtures/testBooks.json')
let objCounter = 0
let objMinimum = testData.testBooksQuantity + 1
let favFlag = false

beforeEach(() => {
  cy.visit('/')
  cy.contains('Books list').should('be.visible')
  cy.login (testData.mail, testData.pass)
   .then (() => {
      cy.get('button').contains("Add new").should('be.visible').wait(1000)
    })
    .then (() => {
      cy.get('div[class="d-flex flex-wrap card-deck"]').children()
        .then (($obj) => {
        objCounter = $obj.length
        }) 
    })
    .then (() => {
      if (objCounter < objMinimum) {
        cy.addTestBooks (testData.pathToTestbooks, testbooks)
      }
    })
  })

afterEach(() => {
  cy.log('favFlag = ' + favFlag)
      cy.contains('Books list').click().wait(1000)
      .then (()=> {
        if (favFlag) {
          cy.contains('Delete from favorite').click()
          .then(()=>{
            favFlag = false
          })
        }
      })
      .then (()=> {
        cy.get('button').contains("Log out").click()
      })
})

describe('Test eBook site', () => {
    it ('should successfully login with correct creds', () => {
      cy.get('#responsive-navbar-nav > div > span').should('have.text', "Добро пожаловать " + testData.mail)
    })

    it ('should add random book to Favorites', () => {
      let num = Math.round(Math.random() * (objMinimum - 2)) // выбор случайного объекта с книгой
      cy // запоминаем название выбранной книги
      .get('div[class="d-flex flex-wrap card-deck"]')
      .children().eq(num).children().find('div[class="card-title h5"]')
      .then(($obj) => {
        let favTitle=$obj.text().toString()
        cy.addToFav(num) // добавляем книгу в Избранное
        cy // идем в Избранное и проверяем, что книга там
        .get('a[href="/favorites"]').click()
        .then(()=>{//.wait(1500)
          cy.contains(favTitle).should('be.visible')
          .then(()=>{
            favFlag = true
          })
        })
      })
    })

    it ('should add random book to Favorites and then delete it', () => {
      
      let num = Math.round(Math.random() * (objMinimum - 2)) // выбор случайного объекта с книгой
      cy 
      .get('div[class="d-flex flex-wrap card-deck"]')
      .children().eq(num).children().find('div[class="card-title h5"]')
      .then(($obj) => {
        let favTitle=$obj.text().toString() // запоминаем название выбранной книги
        cy.addToFav(num) // добавляем книгу в Избранное
        cy // идем в Избранное и проверяем, что книга там
        .get('a[href="/favorites"]').click()
        .then(()=>{
          cy.contains(favTitle).should('be.visible') // дожидаемся появления книги в Избранном
          .then(()=>{
            cy.contains('Delete from favorite').click() // удаляем из Избранного
            .then(()=>{
              cy.contains("Please add some book to favorit on home page!").should('be.visible') // проверяем...
            })
          })
        })
      })
    })

    it ('should add random book to Favorites and go to download it', () => {
      
      let num = Math.round(Math.random() * (objMinimum - 2)) // выбор случайного объекта с книгой
      cy // запоминаем название выбранной книги
      .get('div[class="d-flex flex-wrap card-deck"]')
      .children().eq(num).children().find('div[class="card-title h5"]')
      .then(($obj) => {
        let favTitle=$obj.text().toString()
        cy.addToFav(num) // добавляем книгу в Избранное
        cy // идем в Избранное и проверяем, что книга там
        .get('a[href="/favorites"]').click()
        .then(()=>{//.wait(1500)
          cy.contains(favTitle).should('be.visible')
          .then(()=>{
            favFlag = true
          })
          .click() // кликаем по книге в Избранном
          .then (()=>{
            cy.contains("Dowload book").should('be.visible') // ожидаем кнопку загрузки
          })
        })
      })
    })
  })
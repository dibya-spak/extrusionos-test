

describe('Testing benchmark modal(create/edit/delete benchmarks)',()=>
{
    beforeEach(function(){
        cy.adminLogIn()
        cy.wait(2000)
    })    
    it('verify the user can add a quick mode benchmark',() =>
     {
        cy.log('navigate benchmarks tab')
        cy.contains('Benchmark Tool').click()
        cy.contains('Benchmarks').click()
        cy.log('adding a benchmark')
        cy.contains('Add Benchmark').click()
        cy.log('fill all the input fields')
        cy.get('#asset_benchmark_asset_id').select('RF5')
        cy.get('#asset_benchmark_name').clear().type('automate benchmark')
        cy.get('#asset_benchmark_comments').clear().type('no comment')
        cy.log('click on create quick mode button')
        cy.get('input[name="quick_mode"]').click()
        cy.get('div#toast-container').should('have.text',"Benchmark was successfully created.")
        cy.get('[value="Quick Mode (A to B)"]').should('be.visible')
    })

    it('verify the user can add columns to a benchmark',() =>
     {
        cy.log('navigate benchmarks tab')
        cy.visit('/asset_benchmarks')
        cy.log('select a benchmark in the list')
        cy.get('table>tbody>tr').contains('automate benchmark').click()
        cy.log('validate the quick mode columns header')
        cy.get('[class="col"]').should(($lis) => {
            expect($lis).to.have.length(3)
            expect($lis.eq(0)).to.contain('A: Please select')
            expect($lis.eq(1)).to.contain('B: Please select')
            expect($lis.eq(2)).to.contain('C: Comparison (? to A)')
          })
        cy.log('click on edit button of column A')
        cy.xpath('(//div[@class="align-self-start"])[1]').click()
        cy.log('select a snapshot then save')
        cy.get('#production_snapshots_datatable>tbody>tr:nth-child(1)').click()
        cy.contains('Change column').click()
        cy.get('div#toast-container').should('have.text',"Asset benchmark column was successfully updated.")
        cy.log('click on edit button of column B')
        cy.xpath('(//div[@class="align-self-start"])[2]').click()
        cy.log('click on timestamp column')
        cy.get('[href="#tab-content-timestamp"]').click()
        cy.log('set the time stamp & save')
        cy.get('[type="datetime-local"]').clear().type('2022-01-10T10:10')
        cy.xpath('(//input[@type="submit"])[4]').click({force:true})
        cy.get('div#toast-container').should('have.text',"Asset benchmark column was successfully updated.")
        cy.log('click on edit button of column C')
        cy.xpath('(//div[@class="align-self-start"])[3]').click()
        cy.log('select all the required option & save')
        cy.xpath('//select[@id="asset_benchmark_column_comparison_column_id"]').select('Column B (Timestamp)')
        cy.xpath('//select[@id="asset_benchmark_column_compare_function"]').select('Difference in percent')
        cy.xpath('(//input[@type="submit"])[5]').click()
        cy.get('div#toast-container').should('have.text',"Asset benchmark column was successfully updated.")
        cy.log('validate the quick mode columns header')
        cy.get('[class="col"]').should(($lis) => {
            expect($lis).to.have.length(3)
            expect($lis.eq(0)).to.contain('A: Snapshot')
            expect($lis.eq(1)).to.contain('B: Timestamp')
            expect($lis.eq(2)).to.contain('C: Comparison (B to A)')
          })

    })

    it('verify the user can apply filter to a comparison column then clear the filter',() =>
     {
        cy.log('navigate benchmarks tab')
        cy.visit('/asset_benchmarks')
        cy.log('select a benchmark')
        cy.get('table>tbody>tr').contains('automate benchmark').click()
        cy.xpath('(//div[@class="align-self-start"])[3]').click()
        cy.xpath('(//input[@id="asset_benchmark_column_filter_act"])[3]').clear().type('0')
        cy.xpath('(//input[@id="asset_benchmark_column_filter_set"])[3]').clear().type('1')
        cy.xpath('(//input[@id="asset_benchmark_column_use_absolute"])[3]').click()
        cy.xpath('(//input[@type="submit"])[5]').click()
        cy.get('div#toast-container').should('have.text',"Asset benchmark column was successfully updated.")
        cy.get('[class="text-warning"]').should(($lis) => {
            expect($lis).to.have.length(2)
            expect($lis.eq(0)).to.contain('Act value filter: 0')
            expect($lis.eq(1)).to.contain('Set point filter: 1')
          })
        cy.xpath('(//div[@class="align-self-start"])[3]').click()
        cy.xpath('(//input[@id="asset_benchmark_column_filter_act"])[3]').clear()
        cy.xpath('(//input[@id="asset_benchmark_column_filter_set"])[3]').clear()
        cy.xpath('(//input[@id="asset_benchmark_column_use_absolute"])[3]').click()
        cy.xpath('(//input[@type="submit"])[5]').click()
        cy.get('div#toast-container').should('have.text',"Asset benchmark column was successfully updated.")
        cy.get('[class="col"]>small').should(($lis) => {
            expect($lis).to.have.length(1)
        })

    })
    it('verify the user can config the equipment properties in a benchmark',() =>
     {
        cy.visit('/asset_benchmarks')
        cy.log('select a benchmark')
        cy.get('table>tbody>tr').contains('automate benchmark').click()
        cy.get('[class="btn btn-primary w-100"]').click()
        cy.get('#deselect_all_btn').click()
        cy.get('[value="Update Benchmark"]').click()
        cy.get('div#toast-container').should('have.text',"Benchmark was successfully updated.")
        cy.get('[class="dataTables_empty"]').should('be.visible')

    })
    it('verify the user can save the benchmark as new benchmark',() =>
    {
       cy.visit('/asset_benchmarks')
       cy.log('select a benchmark')
       cy.get('table>tbody>tr').contains('automate benchmark').click()
       cy.get('#asset_benchmark_name').clear().type('new benchmark')
       cy.get('[value="Save as new"]').click()
       cy.get('[class="text-underline"]').click()
       cy.wait(1000)
       cy.get('[class="card-title pt-4"]').should('contain',"Edit Benchmark 'new benchmark'")


   })
   it('verify the user can delete the newly saved benchmark',() =>
     {
        cy.visit('/asset_benchmarks')
        cy.log('click dashboard delete button')
        cy.get('[data-title="Delete Benchmark new benchmark"]').click({force:true})
        cy.contains('Confirm').click()
        cy.get('div#toast-container').should('have.text',"Benchmark was successfully destroyed.")

    })
 
    it('verify the user can delete the quick mode benchmark',() =>
     {
        cy.visit('/asset_benchmarks')
        cy.log('click dashboard delete button')
        cy.get('[data-title="Delete Benchmark automate benchmark"]').click({force:true})
        cy.contains('Confirm').click()
        cy.get('div#toast-container').should('have.text',"Benchmark was successfully destroyed.")

    })

    it('verify the user can redirect to the create benchmark modal & add an advance mode benchmark',() =>
    {
       cy.log('navigate benchmarks tab')
       cy.contains('Benchmark Tool').click()
       cy.get('[href="/asset_benchmarks/new"]').click()
       cy.log('fill all the input fields')
       cy.get('#asset_benchmark_asset_id').select('RF5')
       cy.get('#asset_benchmark_name').clear().type('automate advance benchmark')
       cy.get('#asset_benchmark_comments').clear().type('no comment')
       cy.get('input[name="advanced_mode"]').click()
       cy.get('div#toast-container').should('have.text',"Benchmark was successfully created.")
       cy.get('[value="Advanced Mode (A to B & A to C)"]').should('be.visible')

   })

   it('verify the user can delete the advance mode benchmark',() =>
     {
        cy.visit('/asset_benchmarks')
        cy.log('click dashboard delete button')
        cy.get('[data-title="Delete Benchmark automate advance benchmark"]').click({force:true})
        cy.contains('Confirm').click()
        cy.get('div#toast-container').should('have.text',"Benchmark was successfully destroyed.")

    })
    it('verify the user can add an expert mode benchmark',() =>
     {
        cy.log('navigate benchmarks tab')
        cy.contains('Benchmark Tool').click()
        cy.get('[href="/asset_benchmarks/new"]').click()
        cy.log('fill all the input fields')
        cy.get('#asset_benchmark_asset_id').select('RF5')
        cy.get('#asset_benchmark_name').clear().type('automate export benchmark')
        cy.get('#asset_benchmark_comments').clear().type('no comment')
        cy.get('input[name="commit"]').click()
        cy.get('div#toast-container').should('have.text',"Benchmark was successfully created.")
        cy.get('[value="Expert Mode (N to N)"]').should('be.visible')
    })
    it('verify the user can add & delete columns in that expert mode benchmark',() =>
    {
       cy.log('navigate benchmarks tab')
       cy.visit('/asset_benchmarks')
       cy.log('select a benchmark')
       cy.get('table>tbody>tr').contains('automate export benchmark').click()
       cy.get('[class="btn btn-primary"]').click()
       cy.get('#production_snapshots_datatable>tbody>tr:nth-child(1)').click()
       cy.contains('Save column').click()
       cy.get('div#toast-container').should('have.text',"Asset benchmark column was successfully updated.")
       cy.get('div.flex-column>a:nth-child(2)').click()
       cy.get('[value="Delete column"]').click()
       cy.get('div#toast-container').should('have.text',"Asset benchmark column was successfully destroyed.")
   })

   it('verify the user can delete the expert mode benchmark',() =>
   {
      cy.visit('/asset_benchmarks')
      cy.log('click dashboard delete button')
      cy.get('[data-title="Delete Benchmark automate export benchmark"]').click({force:true})
      cy.contains('Confirm').click()
      cy.get('div#toast-container').should('have.text',"Benchmark was successfully destroyed.")

  })
  
    
    afterEach(function(){
        cy.logOut()
    })
})

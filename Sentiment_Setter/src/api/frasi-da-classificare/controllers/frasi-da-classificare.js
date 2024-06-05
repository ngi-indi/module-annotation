'use strict';

const { filter } = require('../../../../config/middlewares');

/**
 * frasi-da-classificare controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::frasi-da-classificare.frasi-da-classificare', ({ strapi }) => ({
        async NotRelatedToUser(ctx) {
            
            const {userId}=ctx.query;
            //const body = JSON.parse(ctx.request.body);
            //const {lista_keyword}=body;

            if (!userId) {
                return ctx.badRequest('userId is required');
                
            }
            const frasi = await strapi.service("api::frasi-da-classificare.frasi-da-classificare").find({
                fields:['id','testo_frase','flag_classificazione','lista_bias','flag_test','flag_bias'],
                populate:{
                    users:{
                        fields:['id'],
                    }
                }
            },);

            
            let filteredFrasi=frasi.results.filter(frase => {
                // Check if any user in the frase.users array matches the userId
                return !frase.users || !frase.users.length || frase.users.some(user => user.id != Number(userId));
              });
            
            let filteredFrasi2=filteredFrasi.filter(frase => {
                //togli le frasi che hanno già un flag_classificazione a true
                return frase.flag_classificazione != true && frase.flag_test != true;
              });

            let filteredFrasi3=filteredFrasi.filter(frase => {
                //togli le frasi che hanno già un flag_classificazione a true
                return frase.flag_classificazione != true && frase.flag_test === true;
              });

            //crea un array intervallando le frasi di filteredFrasi2 e filteredFrasi3
            let filteredFrasi4=[];
            let i=0;
            let j=0;
            while(i<filteredFrasi2.length && j<filteredFrasi3.length){
                filteredFrasi4.push(filteredFrasi2[i]);
                i++;
                filteredFrasi4.push(filteredFrasi3[j]);
                j++;
            }


            
            //rimuovi i campi inutili

            
            
            return filteredFrasi4;

        },
    

    async UpdateJsonFrasi(ctx){
       
        try {
        
            // Get the array of IDs and lines from the request body
            const body = JSON.parse(ctx.request.body);
            
            
            const { items } = body;

            // Iterate over the array of items
            const updatedElements = [];
            for (const { id, line } of items) {
            try {
                  // Retrieve the element from the database
                  console.log("id",id);
                  const element = await strapi.entityService.findOne('api::frasi-da-classificare.frasi-da-classificare', id, {
                    fields: ['id', 'user_result','flag_classificazione'],
                  });
                  //console.log("results",element.results.user_result);
                  console.log("element",element);

                  // Check if the element exists
                  if (!element) {
                    return ctx.notFound(`Element with ID ${id} not found`);
                  }
                  if (!element.user_result) {
                    element.user_result = [];}

                  // Update the JSON field by adding the line
                  element.user_result.push(line);

                  // Save the changes
                  //return strapi.service('api::frasi-da-classificare.frasi-da-classificare').update({ id }, element);
                  const updatedElement = await strapi.entityService.update('api::frasi-da-classificare.frasi-da-classificare', id, {
                    data: { user_result: element.user_result },
                  });
                  updatedElements.push(updatedElement);
                } catch (error) {
                  // Handle errors for individual items
                  console.error(`Error processing item with ID ${id}:`, error);
                  return null;
                }
          }

          // Send response with updated elements
          ctx.send(updatedElements.filter(element => element !== null));
        } 
        catch (error) {

        // Handle errors
        
        ctx.badRequest('Error processing request');
        
        }/**/
    }
}

    )


);

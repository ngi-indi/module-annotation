'use strict';

const { filter } = require('../../../../config/middlewares');

/**
 * frasi-da-classificare controller
 */

const { createCoreController } = require('@strapi/strapi').factories;



module.exports = createCoreController('api::frasi-da-classificare.frasi-da-classificare', ({ strapi }) => ({
  
  async NotRelatedToUser(ctx) {
      
      const {userId}=ctx.query;

      if (!userId) {
        return ctx.badRequest('userId is required');   
      }

      const user=await strapi.db.query('plugin::users-permissions.user').findOne({
        where: { id: userId },
        populate: ['lista_bias'],
      });
      const keywords=user.lista_bias;

      console.log("keyword",keywords);
      //const body = JSON.parse(ctx.request.body);
      //const {lista_keyword}=body;

      const frasi = await strapi.service("api::frasi-da-classificare.frasi-da-classificare").find({
          fields:['id','testo_frase','flag_classificazione','lista_bias','flag_test','flag_bias'],
          populate:{
              users:{
                  fields:['id'],
              }
          }
      },);

      
      console.log("userId",userId);
      //filtra le frasi che non sono state ancora classificate dall'utente
      const filteredFrasi=frasi.results.filter(frase => {
          console.log("userId",userId);
          console.log("frase.users",frase.users,frase.users.length);
          if (!(frase.users.some(user => user.id === Number(userId)))){
            console.log("ci siamo1");
            return frase;
          }
          if(frase.users.length===0){
            console.log("ci siamo2");
            return frase;
          }
          
        });
      console.log("filteredFrasi",filteredFrasi);
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

      while (i < filteredFrasi2.length || j < filteredFrasi3.length) {
    if (i < filteredFrasi2.length) {
        filteredFrasi4.push(filteredFrasi2[i]);
        i++;
    }
    if (j < filteredFrasi3.length) {
        filteredFrasi4.push(filteredFrasi3[j]);
        j++;
    }
}


      
      //rimuovi le frasi che contengono le keyword nel testo, che è una stringa
      if (keywords!=null && keywords.length>0) {
        const filteredFrasi5=filteredFrasi4.filter(frase => !keywords.some(keyword => frase.testo_frase.includes(keyword)));
        console.log("filteredFrasikeyword",filteredFrasi2);

        return filteredFrasi5;
      }
      else{
        return filteredFrasi4;
      }
  },
    

  async UpdateJsonFrasi(ctx){
      console.log("UpdateJsonFrasi");
      try {
      
          // Get the array of IDs and lines from the request body
          console.log("ctx.request.body",ctx.request.body);
          const body = ctx.request.body;
          console.log("body",body);
          
          const  items  = body.data.items;
          const {userId}=ctx.query;
          console.log("userId",userId);
          
          /**/
          const user = await strapi.db.query('plugin::users-permissions.user').findOne({
            where: { id: userId },
            populate: ['frasi_da_classificares'],
          });

          // Iterate over the array of items
          const updatedElements = [];
          console.log("items",items);
          
          for (const { id, value } of items) {
          try {
//_______________________________________________________________  
//         
//update the SENTENCE 
//_______________________________________________________________
                // Retrieve the element from the database
                console.log("id",id);
                const element = await strapi.entityService.findOne('api::frasi-da-classificare.frasi-da-classificare', id, {
                  fields: ['id', 'user_result','flag_classificazione'],
                });
                console.log("element",element);

                // Check if the element exists
                if (!element) {
                  return ctx.notFound(`Element with ID ${id} not found`);
                }
                if (!element.user_result) {
                  element.user_result = [];}

                // Update the JSON field by adding the pair id-value
                element.user_result.push({userId:userId, value:value});

                // Save the changes
                //return strapi.service('api::frasi-da-classificare.frasi-da-classificare').update({ id }, element);
                const updatedElement = await strapi.entityService.update('api::frasi-da-classificare.frasi-da-classificare', id, {
                  data: { user_result: element.user_result, users:{
                    connect: [userId] 
                  } },
                });
                updatedElements.push(updatedElement);
                

//_______________________________________________________________  
//         
//update the USER 
//_______________________________________________________________

                

                if (!user.frasi_da_classificares) {
                  user.frasi_da_classificares = [];
                }

                //user.frasi_da_classificare.push(id);
                

                const userUpdated2 = await strapi.query("plugin::users-permissions.user").update({
                  where: { id: userId },
                  data:{frasi_da_classificares : {
                    connect: [id]
                  } }
                });
                
                
                
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
  },

  async UpdateTestoFrasi(ctx){
    console.log("UpdateTestoFrasi");
    const body=ctx.request.body;
    console.log("body",body);

    const sentences=body.data.items;
    console.log("frasi",sentences);

    for (const sentence of sentences) {
      
      const response = await strapi.entityService.create('api::frasi-da-classificare.frasi-da-classificare', {
        data:{
          testo_frase: sentence.sentence,
          version: (Number(sentence.version)+1),
          flag_classificazione: false,
          flag_test: true,
          flag_bias: false,
          lista_bias: sentence.bias_type,
          users: [],
        }
      });



    }

    return ctx.send("ok");
    
    

    
  },
}

    )


);

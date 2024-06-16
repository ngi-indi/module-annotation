module.exports = (plugin) => {

    plugin.controllers.user.ChangeRole =async (ctx) => {
        console.log("ChangeRole");
        const body = ctx.request.body;
        const items = body.data.items;
        console.log("body",body);
        console.log("items",items);
        console.log("items", typeof(items));
        
            const newArray = Object.entries(items);
            console.log("newArray",newArray);
        try{}
        catch(e){
            console.log("error",e);
        }
        
        

        for( const [key, value] of newArray){
            console.log("key",key);
            console.log("value",value);

            let value2=0;
            
            if(value=="admin"){
                value2=3;
            }
            else if(value=="public"){
                value2=2;
            }
            else if(value=="authenticated"){
                value2=1;
            }
            
            //user.role=value;
            /*
            await strapi.db.query('plugin::users-permissions.user').update({
                where: { id: key },
            },);
            */
            const updatedElement = await strapi.entityService.update('plugin::users-permissions.user', key, {
                data: { role: value2},
                
              });
        };
        return ctx.send("ok");
  };

  plugin.routes['content-api'].routes.push({
    method: 'POST',
    path: '/user/change-role',
    handler: 'user.ChangeRole',
  });



    return plugin;
  };
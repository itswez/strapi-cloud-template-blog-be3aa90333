const strapi = require('@strapi/strapi');

async function setTagsPermissions() {
  try {
    // Initialize Strapi
    const app = await strapi().load();
    
    // Get the public role
    const publicRole = await app.query('plugin::users-permissions.role').findOne({
      where: { type: 'public' }
    });

    if (!publicRole) {
      console.error('Public role not found');
      return;
    }

    // Update permissions to include tags
    const updatedPermissions = {
      ...publicRole.permissions,
      'api::tag.tag': {
        controllers: {
          'api::tag.tag': {
            find: { enabled: true, policy: '' },
            findOne: { enabled: true, policy: '' }
          }
        }
      }
    };

    // Save the updated role
    await app.query('plugin::users-permissions.role').update({
      where: { id: publicRole.id },
      data: { permissions: updatedPermissions }
    });

    console.log('✅ Tags permissions set successfully!');
    console.log('Public role now has access to:');
    console.log('- GET /api/tags (find)');
    console.log('- GET /api/tags/:id (findOne)');
    
    // Destroy Strapi instance
    await app.destroy();
    
  } catch (error) {
    console.error('❌ Error setting tags permissions:', error);
  }
}

setTagsPermissions(); 
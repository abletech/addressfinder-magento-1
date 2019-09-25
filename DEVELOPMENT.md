## Installing Magento

To get a Magento 1 store running locally:

1. Create a folder with a docker-compose.yml file and an env file, and copy the contents of the docker-compose-example file and example.env.
`mkdir docker-magento-1 && cp addressfinder-magento-1/docker-compose-example.yml docker-magento-1/docker-compose.yml && cp addressfinder-magento-1/example.env docker-magento-1/env`

2. navigate to docker-magento-1 folder and start docker
`docker-compose up`

3. You should be able to visit your Magento store at 'local.magento'. If you have issues you may need to update your host file to redirect localhost to local.magento
   to open the file: `sudo vim /etc/hosts`
   add: `127.0.0.1 local.magento`
   [Need help with Vim?](https://sites.google.com/a/abletech.co.nz/wiki/technology-tips/beginners-guide-to-vim)

4. To install Magento, in a new tab run `docker ps` to find the container id of image alexchen/magento. Then run `docker exec -it <container> install-magento` using the container id.

5. Visit your Magento store:
  * Admin pages: http://local.magento/index.php/admin
  * Shop pages: http://local.magento/index.php/

  Credentials can be found in the example.env file

## Installing a Product in your store

1. Login to the admin side of your store.
2. Navigate to Catalog > Manage Products and click on add a product in the right corner.
3. Fill in the Product details. Make sure you set 'Status' to 'enabled' and 'Visibility' to 'Catalog, Search'
4. Navigate to Inventory in the left menu. Make sure the 'Quantity' is greater than zero and 'Stock Availability' is 'In Stock'
5. Navigate to Categories in the left menu. Make sure the product has a category.
6. Save your product.
7. Next, click on System > Cache Management, and refresh the necessary caches. If you run into a 'try again later error' while doing this, you may need to delete the files in the var/locks folder.
8. When you search for your product in the store, you should now be able to find it and checkout

## Installing the AddressFinder Plugin Manually

<!-- TO DO: The plugin can also be installed via composer, but I wasn't able to get this working. These instructions also need to be added.  -->

You will need to copy files from the plugin into your docker container

1. `docker cp addressfinder-magento-1/app/code/community/AddressFinder  <container>:/var/www/html/app/code/community/AddressFinder`
2. `docker cp addressfinder-magento-1/app/design/frontend/base/default/layout/addressfinder.xml  <container>:/var/www/html/app/design/frontend/base/default/layout/addressfinder.xml`
3. `docker cp addressfinder-magento-1/app/design/frontend/base/default/template/addressfinder  <container>:/var/www/html/app/design/frontend/base/default/template/addressfinder`
4. `docker cp addressfinder-magento-1/app/etc/modules/AddressFinder_AddressFinder.xml  05fe5411ed01:/var/www/html/app/etc/modules/AddressFinder_AddressFinder.xml`
5. `docker cp /Users/katenorquay/addressfinder/addressfinder-magento-1/js/addressfinder  05fe5411ed01:/var/www/html/js/addressfinder`

6. In the Magento admin pages, click System > Cache Storage Management and click the 'Flush Magento Cache' button
7. Click System > Configuration. AddressFinder should be listed in the left menu under 'Services'
8. Click on AddressFinder in the left menu and set the 'enabled' dropdown to 'Yes'. Add any extra configuration here. If you run into issues with the page displaying a 404 not found, logging out and back in should solve it.
9. Save the config. AddressFinder should now work correctly in your store. 


Composer Install
1. install composer:

`php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('sha384', 'composer-setup.php') === 'a5c698ffe4b8e849a443b120cd5ba38043260d5c4023dbf93e1558871f1f07f58274fc6f4c93bcfd858c6bd0775cd8d1') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"`

2. install addressfinder. `php composer.phar require addressfinder/module-magento1`
3. Install the magento-composer-installer. This creates symlinks between the vendor files created by composer, and your magento install. For this to work, you must tell composer where you have installed Magento.
`php composer.phar config extra.magento-root-dir "/var/www/html"` - Replace 'var/www/html' with your Magento insallation directory if yours is differet
`php composer.phar require magento-hackathon/magento-composer-installer:*`
4. Redeploy `php composer.phar run-script post-install-cmd -vvv -- --redeploy`

angular.module('app').run(['$templateCache', function($templateCache) {$templateCache.put('dummy/dummy.html','<div class="page-header">\r\n    <h1>Dummy data</h1>\r\n</div>\r\n\r\n<p>{{ test }}</p>\r\n\r\n\r\n<div ng-if="!error">\r\n    <ul>\r\n        <li ng-repeat="user in users"> {{ user.name }}</li>\r\n    </ul>\r\n</div>\r\n\r\n\r\n\r\n<div ng-if="error" class="alert alert-danger">Fail to fetch data</div>\r\n\r\n\r\n<a ui-sref="home">> Show me home page</a>');
$templateCache.put('home/carte_enigme.html','<div class="enigme">\r\n\t<div class="card vertical">\r\n\t\t<div>\r\n\t\t\t<div class="card-content">\r\n\t\t\t\t<p>{{question}}</p>\r\n\t\t\t</div>\r\n\t\t\t<div class="chips">\r\n\t\t\t\t<i class="close material-icons left">tag_faces</i>{{auteur}}\r\n\t\t    </div>\r\n\t\t    <div class="date">\r\n\t\t\t\tPost\xE9e le {{date | date}}\r\n\t\t    </div>\r\n\t\t\t<div class="card-action">\r\n\t\t\t\t<a href="#">R\xE9pondre \xE0 l\'\xE9nigme</a>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class="col m5 card-content">\r\n<!-- \t\t\t<div>\r\n\t<div chips ng-model="tags">\r\n\t\t\r\n\t</div>\r\n</div> -->\r\n\t\t\r\n\t\t</div>\r\n\t</div>\r\n</div>');
$templateCache.put('home/home.html','\r\n<div class="col s12 m12 l12">\r\n\r\n\r\n\t<div class="section">\r\n\t\t<p><i class="material-icons left">trending_up</i></p><h5>\xC9nigmes tendances</h5><p></p>\r\n\t</div>\r\n\r\n\t<!-- Colonne 1 -->\r\n\r\n<!-- InfiniteScroll permet de charger automatiquement la suite des \xE9nigmes quand on scroll.\r\n\r\ninfinite-scroll indique la fonction qui doit \xEAtre appel\xE9e quand on arrive en bas\r\n\r\ninfinite-scroll-disabled \xE7a permet d\'indiquer un bool\xE9en qui, quand il est vrai, d\xE9sactive le chargement des \xE9nigmes au scroll : dans notre cas on arr\xEAte d\'essayer de charger d\'autres \xE9nigmes quand on en a d\xE9j\xE0 charg\xE9 le maximum, ou quand on est d\xE9j\xE0 en train d\'en chercher sur le serveur (on ne d\xE9clenche pas 2 fois tant qu\'on n\'a pas r\xE9cup\xE9r\xE9 les autres)\r\n\r\ninfinite-scroll-distance c\'est \xE0 quelle distance du bas on commence \xE0 en chagrger d\'autres -->\r\n<div class="row" infinite-scroll="enigmes.nextPage()" infinite-scroll-disabled="enigmes.busy || enigmes.items.length == enigmes.totalCount || enigmes.error" infinite-scroll-distance="1">\r\n\t<div class="col s12 cards-container">\r\n\t\t<div ng-repeat="e in enigmes.items">\r\n\t\t\t<carte-enigme auteur="e.utilisateur.pseudo" question="e.question" date="e.date"></carte-enigme>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n<p ng-if="enigmes.busy">\r\nChargement...  \r\n</p>\r\n<p ng-if="enigmes.error">Echec de la connexion au serveur.</p>\r\n\r\n<div ng-controller="newEnigmaController"> <!-- On rajoute un controller pour g\xE9rer l\'ajout d\'\xE9nigmes -->\r\n\r\n\t<!-- Modal Trigger -->\r\n<!-- Gr\xE2ce \xE0 angular-materialize, on peut utiliser l\'attribut open pour lier l\'ouverture/fermeture du modal \xE0 une variable de $scope.\r\n\tComme \xE7a on peut ouvrir ou fermer le modal depuis le contr\xF4leur en changeant la valeur de $scope.open -->\r\n\t<a data-target="modal1" id="newEnigma" class="btn-floating btn-large waves-effect waves-light red modal-trigger" modal open="open" ng-click="openModal()"><i class="material-icons">add</i></a>\r\n\r\n\t<!-- Modal Structure -->\r\n\t<div id="modal1" class="modal">\r\n\t\t<!-- Quand on valide le formulaire, \xE7a ex\xE9cute la fonction submit() du contr\xF4leur, qui s\'occupe d\'ajouter l\'\xE9nigme \xE0 la bdd -->\r\n\t\t<form novalidate name="enigmeForm" ng-submit="enigmeForm.$valid && submit()"> \r\n\t\t\t<div class="modal-content">\r\n\t\t\t\t<h4>Nouvelle \xE9nigme</h4>\r\n\t\t\t\t<div class="row">\r\n\t\t\t\t\t<div class="col s12">\r\n\t\t\t\t\t\t<div class="row">\r\n\t\t\t\t\t\t\t<div class="input-field col s12">\r\n\t\t\t\t\t\t\t\t<!-- Champ pour entrer l\'\xE9nonc\xE9. Il est li\xE9 \xE0 $scope.question (gr\xE2ce \xE0 l\'attribut ng-model): mettre \xE0 jour le contr\xF4leur met \xE0 jour le contenu de ce champ et vice versa. Comme \xE7a on peut r\xE9cup\xE9rer facilement dans le contr\xF4leur la valeur qui a \xE9t\xE9 saisie ici. -->\r\n\t\t\t\t\t\t\t\t<textarea placeholder="Je viens au d\xE9but de la nuit et \xE0 la fin du matin." id="textarea1" class="materialize-textarea" ng-model="question" required></textarea>\r\n\t\t\t\t\t\t\t\t<label for="enigme">Enonc\xE9</label>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div class="input-field col s6">\r\n\t\t\t\t\t\t\t\t<!-- M\xEAme chose ici, la r\xE9ponse est li\xE9e \xE0 $scope.reponse -->\r\n\t\t\t\t\t\t\t\t<input placeholder="N" id="first_name" type="text" class="validate" ng-model="reponse" required>\r\n\t\t\t\t\t\t\t\t<label for="solution">Solution</label>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class="modal-footer">\r\n\t\t\t\t<!-- Le bouton est "d\xE9sactiv\xE9" tant que le formulaire n\'est pas valide (c\xE0d tous les champs ne sont pas remplis). -->\r\n\t\t\t\t<button type="submit" class="waves-effect waves-green btn {{enigmeForm.$invalid ? \'disabled\' : \'\'}}"><i class="material-icons right" ng-disabled="enigmeForm.$invalid">create</i>Cr\xE9er</button>\r\n\t\t\t</div>\r\n\t\t</form>\r\n\t</div>\r\n\r\n</div></div>');
$templateCache.put('profil/profil.achievements.html','\r\n<h1>Achievements</h1>\r\n\r\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Neque illum adipisci quas officia quasi et magnam odit veritatis maiores dolorum eaque consequatur labore quae, doloribus, atque similique rem, blanditiis ullam.');
$templateCache.put('profil/profil.enigma.html','<h1>Mes \xE9nigmes</h1>\r\n\r\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos recusandae placeat optio dolorem architecto voluptatum itaque quas, explicabo accusamus quae ad inventore eos dolor facilis, ipsum, nam necessitatibus dicta tenetur!');
$templateCache.put('profil/profil.html','<div class="sidenav">\r\n\t<div>\r\n        <div id="user-profile">\r\n            <div id="name">\r\n            USERNAME {{USERNAME}}\r\n        </div>\r\n        </div>\r\n        \r\n        <div>\r\n            <img class="circle" src="../images/user.png">\r\n        </div>\r\n        \r\n    </div>\r\n    <!-- Pour aller dans un sous \xE9tat, il suffit de faire ui-sref=".sousEtat". Comme \xE7a \xE7a remplit le ui-view plus bas avec la bonne vue. -->\r\n    <a ui-sref=".informations">Informations</a> \r\n    <a ui-sref=".enigma">Mes \xE9nigmes</a>\r\n    <a ui-sref=".resolues">Enigmes r\xE9solues</a>\r\n    <a ui-sref=".non_resolues">Enigmes non-r\xE9solues</a>\r\n    <a ui-sref=".suivies">Enigmes suivies</a>\r\n    <a ui-sref=".achievements">Achievements</a>\r\n</div>\r\n\r\n<main id="main-profil">\r\n    <div ui-view></div>\r\n    \r\n</main>\r\n');
$templateCache.put('profil/profil.informations.html','<h1>Informations g\xE9n\xE9rales</h1>\r\npseudo\r\nmdp\r\nmail\r\n\r\nchamps de modifications etc\r\n');
$templateCache.put('profil/profil.non_resolues.html','<h1>Enigmes non-r\xE9solues</h1>\r\n    \r\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Quia dolorem neque delectus consectetur! Quae blanditiis numquam debitis quasi, sit fugit. Facilis eligendi, eius aperiam doloribus ducimus tempora explicabo quam esse.');
$templateCache.put('profil/profil.resolues.html','<h1>Enigmes r\xE9solues</h1>\r\n\r\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Unde amet quisquam dolor maiores, ipsum deleniti ad illum nam. Dicta maiores suscipit ipsam, sapiente, dignissimos veniam labore nostrum nisi voluptates incidunt.');
$templateCache.put('profil/profil.suivies.html','<h1>Enigmes suvies</h1>\r\n\r\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quisquam, consequuntur placeat nam ad possimus nesciunt, maxime obcaecati neque libero maiores magni omnis fugit laborum repellendus ducimus? Natus, consequuntur officiis.');
$templateCache.put('login/login.html','<div class="col-md-6 col-md-offset-3">\r\n    <div class="alert alert-info">\r\n        Username: test<br>\r\n        Password: test\r\n    </div>\r\n    <h2>Login</h2>\r\n    <form name="form" ng-submit="form.$valid && vm.login()" novalidate>\r\n        <div class="form-group" ng-class="{ \'has-error\': form.$submitted && form.username.$invalid }">\r\n            <label for="username">Username</label>\r\n            <input type="text" name="username" class="form-control" ng-model="vm.username" required>\r\n            <div ng-messages="form.$submitted && form.username.$error" class="help-block">\r\n                <div ng-message="required">Username is required</div>\r\n            </div>\r\n        </div>\r\n        <div class="form-group" ng-class="{ \'has-error\': form.$submitted && form.password.$invalid }">\r\n            <label for="password">Password</label>\r\n            <input type="password" name="password" class="form-control" ng-model="vm.password" required>\r\n            <div ng-messages="form.$submitted && form.password.$error" class="help-block">\r\n                <div ng-message="required">Password is required</div>\r\n            </div>\r\n        </div>\r\n        <div class="form-group">\r\n            <button ng-disabled="vm.loading" class="btn btn-primary">Login</button>\r\n            <img ng-if="vm.loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==">\r\n        </div>\r\n        <div ng-if="vm.error" class="alert alert-danger">{{vm.error}}</div>\r\n    </form>\r\n</div>\r\n');
$templateCache.put('register/register.html','<h1 id="inscription">Inscription</h1>\r\n\r\n<div class="container col s8">\r\n  <form class="col s14">\r\n    \r\n    <div class="row">\r\n      <div class="input-field hoverable col s6">\r\n        <i class="material-icons prefix">account_circle</i>\r\n        <input id="username" type="text" class="validate">\r\n        <label for="username">Nom d\'utilisateur</label>\r\n      </div>\r\n      <div class="input-field hoverable col s6">\r\n        <i class="material-icons prefix">email</i>\r\n        <input id="email" type="email" class="validate">\r\n        <label for="email">Email</label>\r\n      </div>\r\n    </div>\r\n    <div class="row">\r\n      <div class="input-field hoverable col s6">\r\n        <i class="material-icons prefix">vpn_key</i>\r\n        <input id="password" type="password" class="validate">\r\n        <label for="password">Mot-de-passe</label>\r\n      </div>\r\n      <div class="input-field hoverable col s6">\r\n        <i class="material-icons prefix">replay</i>\r\n        <input id="password2" type="password" class="validate">\r\n        <label for="password2">Retapez le mot-de-passe</label>\r\n      </div>\r\n    </div>\r\n    <a class="waves-effect waves-light btn right hoverable"><i class="large material-icons right">done</i>register</a>\r\n  </form>\r\n\r\n</div>');}]);
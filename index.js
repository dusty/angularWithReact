;(function() {
  angular.module('app', [])
  .component('helloAngular', {
    template: '' +
    '<div style="border: 2px solid black; padding: 2em;">' +
    '  <h2>I Am in Angular</h2>' +
    '  Tell Me Something: <input ng-model="$ctrl.text">' +
    '  <br><br>' +
    '  <button ng-click="$ctrl.showReact = !$ctrl.showReact">Toggle React Component</button>' +
    '  <br><br>' +
    '  <wrap-that-shit ng-if="$ctrl.showReact"' +
    '    text="$ctrl.text"' +
    '    on-update="$ctrl.onUpdate(event)"></wrap-that-shit>' +
    '</div>',
    controller: function () {
      this.onUpdate = function(event) {
        this.text = event.text
      }
    }
  })
  .directive('wrapThatShit', function() {
    return {
      restrict: 'E',
      scope: { text: '<', onUpdate: '&' },
      link: function(scope, element) {
        function loadReact() {
          var reactElement = React.createElement(ExampleComponent, {text: scope.text, onUpdate: sendUpdate}, null)
          ReactDOM.render(reactElement, element[0])
        }
        function sendUpdate(updates) {
          scope.$apply(function() {
            scope.onUpdate({event: updates})
          })
        }
        scope.$watch('text', loadReact)
        scope.$on('$destroy', function() {
          ReactDOM.unmountComponentAtNode(element[0])
        })
        loadReact()
      }
    }
  })
})()

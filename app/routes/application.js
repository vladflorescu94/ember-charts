import Ember from 'ember';
import config from 'ember-charts/config/environment';

export default Ember.Route.extend({
  activeDataset: Ember.inject.service(),

  model() {
    // return this.store.findAll('datasetDescription');
    return $.ajax(`${config.apiHost}/${config.apiPrefix}/documents/descriptions`);
  },

  createDatasetDescriptions(datasets, areUnidimensional) {
    return datasets.map(dataset => {
      return this.store.createRecord('datasetDescription', {
        datasetId: dataset.id,
        title: dataset.title,
        isUnidimensional: areUnidimensional
      })
    })
  },

  setupController(controller, model) {
    this._super(...arguments);

    controller.set('datasetDescriptions', _.concat(
      this.createDatasetDescriptions(model.unidimensionalDatasets, true),
      this.createDatasetDescriptions(model.bidimensionalDatasets, false)
    ));

    // // Sample unidimensional data
    // this.set('activeDataset.instance', this.store.createRecord('unidimensionalDataset', {
    //   // Sample Category Data
    //   values: Ember.A([
    //     { key: 'vlad', val: 10 },
    //     { key: 'iustin', val: 7 },
    //     { key: 'vladut', val: 12 },
    //     { key: 'stan', val: 3 }
    //   ])

    //   // Sample Date Data
    //   values: Ember.A([
    //     { key: '15-12-1996', val: 10 },
    //     { key: '12-05-1994', val: 7 },
    //     { key: '12-09-1999', val: 12 },
    //     { key: '03-05-1992', val: 3 }
    //   ])
    // }));

    // // Sample bidimensional data
    // this.set('activeDataset.instance', this.store.createRecord('bidimensionalDataset', {
    //   values: Ember.A([{
    //     key: 'Vlad',
    //     val: Ember.A([{
    //       key: 'Rosii',
    //       val: 5
    //     }, {
    //       key: 'ceapa',
    //       val: 2
    //     }, {
    //       key: 'ardei',
    //       val: 1
    //     }])
    //   }, {
    //     key: 'Leontin',
    //     val: Ember.A([{
    //       key: 'Rosii',
    //       val: 6
    //     }, {
    //       key: 'ceapa',
    //       val: 7
    //     }, {
    //       key: 'ardei',
    //       val: 6
    //     }])
    //   }, {
    //     key: 'Ion',
    //     val: Ember.A([{
    //       key: 'Rosii',
    //       val: 7
    //     }, {
    //       key: 'ceapa',
    //       val: 7
    //     }, {
    //       key: 'ardei',
    //       val: 7
    //     }])
    //   }, {
    //     key: 'Allx',
    //     val: Ember.A([{
    //       key: 'Rosii',
    //       val: 3
    //     }, {
    //       key: 'ceapa',
    //       val: 4
    //     }, {
    //       key: 'ardei',
    //       val: 3
    //     }])
    //   }])
    // }));
  },

  redirect() {
    this.transitionTo('charts');
  }
});

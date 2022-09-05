// @fix https://github.com/vuejs/vue-cli/issues/1198
// Typescript: IDE reports TS2307: Cannot find module error for Vue components imports
declare module "*.vue" {
    import Vue from "vue";
    export default Vue;
}
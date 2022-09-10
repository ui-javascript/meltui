// vite.lib.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";
var __vite_injected_original_dirname = "E:\\workspace-meltui\\meltui";
var vite_lib_config_default = defineConfig({
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/lib.ts"),
      name: "melt-crud",
      formats: ["es", "cjs"],
      fileName: "melt-crud"
    },
    rollupOptions: {
      external: [
        "vue",
        "lodash",
        "xlsx",
        "be-full",
        "vxe-table",
        "xe-utils",
        "@arco-design/web-vue",
        "axios"
      ],
      output: {}
    }
  },
  plugins: [vue(), dts({
    insertTypesEntry: true,
    copyDtsFiles: false,
    skipDiagnostics: false,
    logDiagnostics: true
  })],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "./src"),
      "@c": resolve(__vite_injected_original_dirname, "./src/components")
    }
  }
});
export {
  vite_lib_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5saWIuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcd29ya3NwYWNlLW1lbHR1aVxcXFxtZWx0dWlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXHdvcmtzcGFjZS1tZWx0dWlcXFxcbWVsdHVpXFxcXHZpdGUubGliLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovd29ya3NwYWNlLW1lbHR1aS9tZWx0dWkvdml0ZS5saWIuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcclxuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIGJ1aWxkOiB7XHJcbiAgICBsaWI6IHtcclxuICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2xpYi50cycpLFxyXG4gICAgICBuYW1lOiAnbWVsdC1jcnVkJyxcclxuICAgICAgZm9ybWF0czogWydlcycsJ2NqcyddLFxyXG4gICAgICBmaWxlTmFtZTogJ21lbHQtY3J1ZCcsXHJcbiAgICB9LFxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAvLyBcdTc4NkVcdTRGRERcdTU5MTZcdTkwRThcdTUzMTZcdTU5MDRcdTc0MDZcdTkwQTNcdTRFOUJcdTRGNjBcdTRFMERcdTYwRjNcdTYyNTNcdTUzMDVcdThGREJcdTVFOTNcdTc2ODRcdTRGOURcdThENTZcclxuICAgICAgZXh0ZXJuYWw6IFtcclxuICAgICAgICAgICd2dWUnLCAnbG9kYXNoJywgXHJcbiAgICAgICAgICAneGxzeCcsICdiZS1mdWxsJywgJ3Z4ZS10YWJsZScsICd4ZS11dGlscycsIFxyXG4gICAgICAgICAgJ0BhcmNvLWRlc2lnbi93ZWItdnVlJywgICdheGlvcydcclxuICAgICAgXSxcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgLy8gXHU1NzI4IFVNRCBcdTY3ODRcdTVFRkFcdTZBMjFcdTVGMEZcdTRFMEJcdTRFM0FcdThGRDlcdTRFOUJcdTU5MTZcdTkwRThcdTUzMTZcdTc2ODRcdTRGOURcdThENTZcdTYzRDBcdTRGOUJcdTRFMDBcdTRFMkFcdTUxNjhcdTVDNDBcdTUzRDhcdTkxQ0ZcclxuICAgICAgICAvLyBnbG9iYWxzOiB7XHJcbiAgICAgICAgLy8gICB2dWU6ICdWdWUnXHJcbiAgICAgICAgLy8gfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBwbHVnaW5zOiBbdnVlKCksIGR0cyh7XHJcbiAgICBpbnNlcnRUeXBlc0VudHJ5OiB0cnVlLCBjb3B5RHRzRmlsZXM6IGZhbHNlLFxyXG4gICAgc2tpcERpYWdub3N0aWNzOiBmYWxzZSwgbG9nRGlhZ25vc3RpY3M6IHRydWVcclxuICB9KV0sXHJcbiAgY3NzOiB7XHJcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgIGxlc3M6IHtcclxuICAgICAgICBqYXZhc2NyaXB0RW5hYmxlZDogdHJ1ZSxcclxuICAgICAgfSxcclxuICAgIH1cclxuICB9LFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgIFwiQFwiOiByZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcclxuICAgICAgXCJAY1wiOiByZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9jb21wb25lbnRzXCIpLFxyXG4gICAgfSxcclxuICB9LFxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQThRLFNBQVMsb0JBQW9CO0FBQzNTLE9BQU8sU0FBUztBQUNoQixTQUFTLGVBQWU7QUFDeEIsT0FBTyxTQUFTO0FBSGhCLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sMEJBQVEsYUFBYTtBQUFBLEVBQzFCLE9BQU87QUFBQSxJQUNMLEtBQUs7QUFBQSxNQUNILE9BQU8sUUFBUSxrQ0FBVyxZQUFZO0FBQUEsTUFDdEMsTUFBTTtBQUFBLE1BQ04sU0FBUyxDQUFDLE1BQUssS0FBSztBQUFBLE1BQ3BCLFVBQVU7QUFBQSxJQUNaO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFFYixVQUFVO0FBQUEsUUFDTjtBQUFBLFFBQU87QUFBQSxRQUNQO0FBQUEsUUFBUTtBQUFBLFFBQVc7QUFBQSxRQUFhO0FBQUEsUUFDaEM7QUFBQSxRQUF5QjtBQUFBLE1BQzdCO0FBQUEsTUFDQSxRQUFRLENBS1I7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUyxDQUFDLElBQUksR0FBRyxJQUFJO0FBQUEsSUFDbkIsa0JBQWtCO0FBQUEsSUFBTSxjQUFjO0FBQUEsSUFDdEMsaUJBQWlCO0FBQUEsSUFBTyxnQkFBZ0I7QUFBQSxFQUMxQyxDQUFDLENBQUM7QUFBQSxFQUNGLEtBQUs7QUFBQSxJQUNILHFCQUFxQjtBQUFBLE1BQ25CLE1BQU07QUFBQSxRQUNKLG1CQUFtQjtBQUFBLE1BQ3JCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsTUFDL0IsTUFBTSxRQUFRLGtDQUFXLGtCQUFrQjtBQUFBLElBQzdDO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==

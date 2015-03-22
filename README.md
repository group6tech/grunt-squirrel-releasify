# Squirrel Releasify Grunt Plugin

Grunt plugin that releasifies [NuGet](https://www.nuget.org/) packages for [Squirrel](https://github.com/Squirrel/Squirrel.Windows) updates.

## Installing

```
npm install --save-dev grunt-squirrel
```

## Configuring

In your `Gruntfile.js` add the following:

```
grunt.loadNpmTasks('grunt-squirrel-releasify')
```

Then configure a source NuGet package and an output folder as the task:

```
'squirrel-releasify': {
  src: '/path/to/app.nupkg',
  dest: '/pato/to/output'
}
```

Then run `grunt squirrel-releasify` and you will have a `RELEASES`, `.nupkg`, and a `.exe` in the `dest` folder.

## Options

| Config Name     | Required | Description |
| --------------- | -------- | ----------- |
| `src`           | Yes      | The folder path of your NuGet package |
| `dest`          | Yes      | The folder path to create the `.exe` installer in |
| `loadingGif`    | No       | The local path to a `.gif` file to display during install |

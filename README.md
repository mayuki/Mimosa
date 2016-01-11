# Mimosa
Syntax highlighter built with Monaco Editor (Visual Studio Code)

## Usage

### 1. extract or clone scripts and upload to web server.

### 2. Enable Mimosa in your web page/site.
```html
<!-- Mimosa -->
<script src="mimosa/vs/loader.js"></script>
<script src="mimosa/mimosa.min.js"></script>
<script>
    require.config({
        baseUrl: 'mimosa/', // path to Mimosa
    });
    Mimosa.initialize(); // Initialze and apply syntax highlighting
</script>
```

### 3. Write your code in a page.

Mimosa automatically applies syntax highlighting to ```pre``` element that have ```vs``` class name and ```data-lang``` attribute.  

```data-lang``` attribute accepts Visual Studio Code suppored languages. ([css, html, javascript,...](https://github.com/Microsoft/vscode/tree/master/src/vs/languages), [csharp, bat, powershell, ...](https://github.com/Microsoft/vscode/tree/master/src/vs/editor/standalone-languages))

```html
<pre data-lang="csharp" class="monaco-editor vs">
class A
{
    public async Task&lt;int> Hoge()
    {
        await Task.Delay(1000);
        return 10;
    }
}
</pre>
```

## Settings

```javascript
Mimosa.settings = {
    colorizeOnLoad: true,
    defaultTargetSelector: 'pre.vs[data-lang]',
};
```

## API

### Mimosa.colorize(text: string, mode: string): Promise<string>
### Mimosa.colorizeElement(target: HTMLElement): void

## License
MIT License

**THIS LIBRARY IS DEPRECATED.** IT MIGHT STILL WORK FOR CERTAIN USE CASES BUT ISN'T BEING ACTIVELY DEVELOPED OR MAINTAINED ANYMORE. 

# Purell — The Hand Santizer for HTML

Purell is used to extract clean HTML from any kind of flat file format and prepare it for conversion into a raw [Superbook](https://bubblin.io/docs/format).  It is a `pure` CLI utility to turn low quality markup available off of ordinary files into a high-quality Superbook-compatible markdown as per Bubblin-approved standards.

### How to use

Purell is almost entirely designed to be used at the root of a [Bookiza](https://bookiza.io) app. However, it can also be used as a transitioning tool between older file formats and the Superbook format,like so:

1. MS Word ⭌ Extract ugly HTML ⭌ Markdown ⭌ Sanitized HTML ⭌ Superbook
2. ePub ⭌ Markdown ⭌ Sanitized HTML ⭌ Superbook
3. PDF ⭌ ⭌ Markdown ⭌ Sanitized HTML ⭌ Superbook
4. Webpage (Scroll) ⭌ Markdown ⭌ Sanitized HTML ⭌ Superbook

### Vocabulary

```
	$ pure --help

	$ pure fetch <url>					// Will fetch original.html from source URI

	$ pure defile <path to file>		// Will extract original.html from source file.

	$ pure sanitize 					// Markdown Compatible HTML (Sanitized)


```

The responsibility to paginate the `sanitized.html` into a Superbook is held by [h2s](https://github.com/bookiza/h2s). 


### License

Blueoak Model License 1.0.0

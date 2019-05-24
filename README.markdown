# Purell — The Hand Santizer for HTML

Purell is used to extract manuscript from any kind of file format and prepare it for conversion into a raw [Superbook](https://bubblin.io/docs/format).  It is `pure` CLI utility to convert and sanitize low quality markup into clean markdown compatible markup—the lowest common denominator between web and other propreitary formats.

### How to use

Purell is almost entirely designed to be used at the root of a [Bookiza](https://bookiza.io) app. But it can be used as a transitor between file formats as well, like so:

1. MS Word ⭌ Ugly HTML extract ⭌ Markdown Compatible HTML (Sanitized) ⭌ Superbook
2. ePub ⭌ Markdown Compatible HTML (Sanitized) ⭌ Superbook
3. PDF ⭌ Markdown Compatible HTML (Sanitized) ⭌ Superbook
4. Webpage (Scroll) ⭌ Markdown Compatible HTML (Sanitized) ⭌ Superbook

### Alert

Documentation on these parts are sparse. Copious amounts of patience is advised. 

### Vocabulary

```
	$ pure --help

	$ pure fetch <url>					// Will fetch original.html from source URI

	$ pure defile <path to file>		// Will extract original.html from source file.

	$ pure sanitize 					// Markdown Compatible HTML (Sanitized)


```

The responsibility to convert `Markdown Compatible HTML (Sanitized)` into a Superbook is left with [m2s](https://github.com/bookiza/m2s). 


### License

Blueoak Model License 1.0.0
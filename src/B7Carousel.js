import { html, css, LitElement } from 'lit-element';
import '@polymer/iron-a11y-keys/iron-a11y-keys.js';

export class B7Carousel extends LitElement {
	static get styles() {
		return css`
			:host {
				display: flex;
				flex-direction: row;
			}

			/* Hide a bunch of stuff */
			::-webkit-scrollbar, iron-a11y-keys {
				display: none !important;
			}

			/* Hide Firefox scrollbars */
			@-moz-document url-prefix(http://),url-prefix(https://) {
				scrollbar {
					-moz-appearance: none !important;
				}
			}

			#track {
				overflow-x: scroll;
				overflow-y: hidden;
				align-items: center;
				justify-content: space-between;
				flex: 1 1 auto;
				display: flex;
				flex-direction: row;
				-ms-overflow-style: none;
			}

			#track::slotted(*) {
				/* max-width: 100% !important; */
				flex: 1 1 100%;
			}

			:host .chevron::slotted(*) {
				cursor: pointer;
			}
		`;
	}

	static get properties() {
		return {
			trackAlignmentTimeOut: {
				type: Number,
				value: 0.1
			},
			_target: {
				type: Object
			},
			_pivotElement: {
				type: Object
			},
			tabindex: {
				type: Number,
				value: 0,
				reflectToAttribute: true
			},
			snapAlign: {
				type: String,
				value: 'center'
			}
		};
	}
	
	firstUpdated()
	{
		
		this._target = this;
		let track = this.shadowRoot.getElementById('track');
		
		// Intersection Observers
		this._observer = new IntersectionObserver(
			(entries) => {
				entries.forEach(entry => {
					if (entry.intersectionRatio > 0.6) entry.target.classList.add('b7-visible');
					if (entry.intersectionRatio < 0.4) entry.target.classList.remove('b7-visible');

					if (entry.intersectionRatio > 0.99) entry.target.classList.add('b7-completely-visible');
					if (entry.intersectionRatio < 0.9) entry.target.classList.remove('b7-completely-visible');
				})
			},
			{
				root: track,
				rootMargin: "0px",
				threshold: [0.0, 0.4, 0.6, 1.0]
			}
		);
		
		let assignedElements = (track.assignedElements) ? track.assignedElements() : this.children;
		this._pivotElement = assignedElements[0];
		assignedElements.forEach(element => this._observer.observe(element));
	}


	render() {
		return html`
			<style is="custom-style" include="iron-flex iron-flex-alignment">
				:host {
					display: flex;
					flex-direction: row;
				}

				/* Hide a bunch of stuff */
				::-webkit-scrollbar, iron-a11y-keys {
					display: none !important;
				}

				/* Hide Firefox scrollbars */
				@-moz-document url-prefix(http://),url-prefix(https://) {
					scrollbar {
						-moz-appearance: none !important;
					}
				}

				#track {
					overflow-x: scroll;
					overflow-y: hidden;
					align-items: center;
					justify-content: space-between;
					flex: 1 1 auto;
					display: flex;
					flex-direction: row;
					scroll-snap-type: x mandatory;
					-ms-overflow-style: none;
				}

				#track::slotted(*) {
					/*
					max-height: 100% !important;
					max-width: 100% !important;
					*/
					flex: 1 1 100%;
					scroll-snap-align: center;
					scroll-snap-stop: always;
				}

				:host .chevron::slotted(*) {
					cursor: pointer;
				}
			</style>

			<iron-a11y-keys
				.target=${this._target}
				keys="left pagedown down"
				@keys-pressed=${ event => {
					event.preventDefault();
					event.stopImmediatePropagation();
					setTimeout( _ => this.prev(), 0);
				}}>
			</iron-a11y-keys>

			<iron-a11y-keys
				.target=${this._target}
				keys="right pageup up"
				@keys-pressed=${ event => {
					event.preventDefault();
					event.stopImmediatePropagation();
					setTimeout( _ => this.next(), 0);
				}}>
			</iron-a11y-keys>

			<slot name="prev" class="chevron" @click=${this.prev}>
				<button>&lt;</button>
			</slot>
			<slot id="track"></slot>
			<slot name="next" class="chevron" @click=${this.next}>
				<button>&gt;</button>
			</slot>
		`;
	}

	next()
	{
		const track = this.shadowRoot.getElementById('track');
		const assignedElements = (track.assignedElements) ? track.assignedElements() : this.children;
		// let visibleElements = assignedElements.filter(element => element.classList.contains('b7-visible'));
		// if (visibleElements.length > 0) this._pivotElement = visibleElements[visibleElements.length - 1];
		const idx = assignedElements.indexOf(this._pivotElement);
		const new_idx = idx >= (assignedElements.length - 1) ? 0 : idx + 1;

		let target = assignedElements[new_idx];
		target.scrollIntoView({
			behavior: "smooth",
			block: "nearest",
			inline: "center"
		});
		this._pivotElement = target;
	}

	prev()
	{
		const track = this.shadowRoot.getElementById('track');
		const assignedElements = (track.assignedElements) ? track.assignedElements() : this.children;
		// let visibleElements = assignedElements.filter(element => element.classList.contains('b7-visible'));
		// if (visibleElements.length > 0) this._pivotElement = visibleElements[0];
		const idx = assignedElements.indexOf(this._pivotElement);
		const new_idx = idx <= 0 ? assignedElements.length - 1 : idx - 1;

		let target = assignedElements[new_idx];

		target.scrollIntoView({
			behavior: "smooth",
			block: "nearest",
			inline: 'center'
		});
		this._pivotElement = target;
	}
}

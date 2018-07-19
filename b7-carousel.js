import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-a11y-keys/iron-a11y-keys.js';

export const B7Carousel = class extends PolymerElement {
	static get template()
	{
		return html`
			<style is="custom-style">
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
				#track #content::slotted(*) {
					max-height: 100% !important;
					max-width: 100% !important;
					flex: 1 1 100%;
				}

				:host .chevron::slotted(*) {
					cursor: pointer;
				}
			</style>
			
			<iron-a11y-keys
				target="[[ _target ]]"
				keys="left pagedown down"
				on-keys-pressed="_handlePrev">
			</iron-a11y-keys>
			
			<iron-a11y-keys
				target="[[ _target ]]"
				keys="right pageup up"
				on-keys-pressed="_handleNext">
			</iron-a11y-keys>
			
			<slot name="prev" class="chevron">
				<button>L</button>
			</slot>
			<div id="track">
				<slot id="content"></slot>
			</div>
			<slot name="next" class="chevron">
				<button>R</button>
			</slot>
		`;
	}
	static get is() { return 'b7-carousel'; }
	static get properties() {
		return {
			_target: {
				type: Object
			},
			tabindex: {
				type: Number,
				value: 0,
				reflectToAttribute: true
			}
		};
	}
	
	connectedCallback()
	{
		super.connectedCallback();
		
		this._target = this;

		this.shadowRoot.role = 'marquee';
		
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
				root: this.shadowRoot.querySelector('#track'),
				rootMargin: "0px",
				threshold: [0.0, 0.4, 0.6, 1.0]
			}
		);

		let content = this.shadowRoot.querySelector('#content');
		this._assignedElements = (content.assignedElements) ? content.assignedElements() : Array.from(this.children);
		this._assignedElements.forEach(element => this._observer.observe(element));

		this.shadowRoot.querySelector('slot[name=next]').addEventListener('click', _ => this._next());
		this.shadowRoot.querySelector('slot[name=prev]').addEventListener('click', _ => this._prev());
	}
	
	_handleNext(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		setTimeout( _ => this._next(), 0);
	}
	
	_next()
	{
		let visibleElements = this._assignedElements.filter(element => element.classList.contains('b7-visible'));
		let pivotElement = visibleElements[visibleElements.length - 1];
		
		if (pivotElement.nextElementSibling) {
			pivotElement.nextElementSibling.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
				inline: "end"
			});
		}
	}
	
	_handlePrev(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		setTimeout( _ => this._prev(), 0);
	}
	
	_prev()
	{
		let visibleElements = this._assignedElements.filter(element => element.classList.contains('b7-visible'));
		let pivotElement = visibleElements[0];
		if (pivotElement.previousElementSibling) {
			pivotElement.previousElementSibling.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
				inline: "start"
			});
		}
	}
};

window.customElements.define(B7Carousel.is, B7Carousel);

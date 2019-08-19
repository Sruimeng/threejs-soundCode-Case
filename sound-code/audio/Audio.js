/**
 * @author mrdoob / http://mrdoob.com/
 * @author Reece Aaron Lecrivain / http://reecenotes.com/
 */
import { Object3D } from '../core/Object3D.js';
/**
 * Audio声音实例，必须有一个listener
 */
function Audio( listener ) {
	//继承自object3D
	Object3D.call( this );

	this.type = 'Audio';
	//获得Audiolistener
	this.listener = listener;
	//获得listener上下文
	this.context = listener.context;
	//获得上下文创建的gain node
	this.gain = this.context.createGain();
	this.gain.connect( listener.getInput() );
	//自动播放
	this.autoplay = false;
	//资源的buffer
	this.buffer = null;
	//音高，以音分为单位。 +/- 100为一个半音， +/- 1200为一个八度。默认值为0。（前面的是官网的解释，具体的音乐是怎么划分的我也不清楚）
	this.detune = 0;
	//循环
	this.loop = false;
	//开始时间
	this.startTime = 0;
	//偏移的时间
	this.offset = 0;
	//播放的速率
	this.playbackRate = 1;
	//是否在播放
	this.isPlaying = false;
	//是否有播放暂停等方法
	this.hasPlaybackControl = true;
	//音乐资源类型
	this.sourceType = 'empty';
	// 表示BiquadFilterNodes的数组.https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode 
	// 可以使用多种不同的低阶filters去创建复杂的音效. 
	// filters可以通过 Audio.setFilter 或者 Audio.setFilters设置.
	this.filters = [];

}

Audio.prototype = Object.assign( Object.create( Object3D.prototype ), {
	//构造器类型
	constructor: Audio,
	//获得gainnode
	getOutput: function () {

		return this.gain;

	},
	//设置source给audioBuffer, 和设置sourceType给 'audioNode'.
	//并且设置hasPlaybackControl为false.
	setNodeSource: function ( audioNode ) {

		this.hasPlaybackControl = false;
		this.sourceType = 'audioNode';
		this.source = audioNode;
		this.connect();

		return this;

	},

	/**
	*  应用HTMLMediaElement类型对象作为音源.
	* 并且设置hasPlaybackControl为false.
	*/
	setMediaElementSource: function ( mediaElement ) {

		this.hasPlaybackControl = false;
		this.sourceType = 'mediaNode';
		this.source = this.context.createMediaElementSource( mediaElement );
		this.connect();

		return this;

	},

	/**
	 * 设置source给audioBuffer, 和设置sourceType为'buffer'.
	 * 如果autoplay为true, 也开始播放.
	 */
	setBuffer: function ( audioBuffer ) {

		this.buffer = audioBuffer;
		this.sourceType = 'buffer';

		if ( this.autoplay ) this.play();

		return this;

	},
	/**
	 * 播放方法
	 */
	play: function () {

		if ( this.isPlaying === true ) {

			console.warn( 'THREE.Audio: Audio is already playing.' );
			return;

		}

		if ( this.hasPlaybackControl === false ) {

			console.warn( 'THREE.Audio: this Audio has no playback control.' );
			return;

		}
		//创建一个buffer资源
		var source = this.context.createBufferSource();
		//设置相关参数
		source.buffer = this.buffer;
		source.loop = this.loop;
		source.onended = this.onEnded.bind( this );
		this.startTime = this.context.currentTime;
		source.start( this.startTime, this.offset );

		this.isPlaying = true;

		this.source = source;

		this.setDetune( this.detune );
		this.setPlaybackRate( this.playbackRate );

		return this.connect();

	},
	/**
	 * 暂停方法
	 */
	pause: function () {

		if ( this.hasPlaybackControl === false ) {

			console.warn( 'THREE.Audio: this Audio has no playback control.' );
			return;

		}
		/**
		 * 如果正在播放：
		 * 资源停止
		 * 已经播放的设置为空
		 * 设置偏移量
		 * 设置播放键为false
		 */
		if ( this.isPlaying === true ) {

			this.source.stop();
			this.source.onended = null;
			this.offset += ( this.context.currentTime - this.startTime ) * this.playbackRate;
			this.isPlaying = false;

		}

		return this;

	},
	/**
	 * 停止播放方法
	 */
	stop: function () {

		if ( this.hasPlaybackControl === false ) {

			console.warn( 'THREE.Audio: this Audio has no playback control.' );
			return;

		}
		/**
		 * 资源停止
		 * 已经播放的设置为空
		 * 偏移量设置为0
		 * 播放键设置为false
		 */
		this.source.stop();
		this.source.onended = null;
		this.offset = 0;
		this.isPlaying = false;

		return this;

	},
	/**
	 * 链接Audio.source的方法，
	 */
	connect: function () {

		if ( this.filters.length > 0 ) {

			this.source.connect( this.filters[ 0 ] );

			for ( var i = 1, l = this.filters.length; i < l; i ++ ) {

				this.filters[ i - 1 ].connect( this.filters[ i ] );

			}

			this.filters[ this.filters.length - 1 ].connect( this.getOutput() );

		} else {

			this.source.connect( this.getOutput() );

		}

		return this;

	},

	disconnect: function () {

		if ( this.filters.length > 0 ) {

			this.source.disconnect( this.filters[ 0 ] );

			for ( var i = 1, l = this.filters.length; i < l; i ++ ) {

				this.filters[ i - 1 ].disconnect( this.filters[ i ] );

			}

			this.filters[ this.filters.length - 1 ].disconnect( this.getOutput() );

		} else {

			this.source.disconnect( this.getOutput() );

		}

		return this;

	},

	getFilters: function () {

		return this.filters;

	},

	setFilters: function ( value ) {

		if ( ! value ) value = [];

		if ( this.isPlaying === true ) {

			this.disconnect();
			this.filters = value;
			this.connect();

		} else {

			this.filters = value;

		}

		return this;

	},

	setDetune: function ( value ) {

		this.detune = value;

		if ( this.source.detune === undefined ) return; // only set detune when available

		if ( this.isPlaying === true ) {

			this.source.detune.setTargetAtTime( this.detune, this.context.currentTime, 0.01 );

		}

		return this;

	},

	getDetune: function () {

		return this.detune;

	},

	getFilter: function () {

		return this.getFilters()[ 0 ];

	},

	setFilter: function ( filter ) {

		return this.setFilters( filter ? [ filter ] : [] );

	},

	setPlaybackRate: function ( value ) {

		if ( this.hasPlaybackControl === false ) {

			console.warn( 'THREE.Audio: this Audio has no playback control.' );
			return;

		}

		this.playbackRate = value;

		if ( this.isPlaying === true ) {

			this.source.playbackRate.setTargetAtTime( this.playbackRate, this.context.currentTime, 0.01 );

		}

		return this;

	},

	getPlaybackRate: function () {

		return this.playbackRate;

	},

	onEnded: function () {

		this.isPlaying = false;

	},

	getLoop: function () {

		if ( this.hasPlaybackControl === false ) {

			console.warn( 'THREE.Audio: this Audio has no playback control.' );
			return false;

		}

		return this.loop;

	},

	setLoop: function ( value ) {

		if ( this.hasPlaybackControl === false ) {

			console.warn( 'THREE.Audio: this Audio has no playback control.' );
			return;

		}

		this.loop = value;

		if ( this.isPlaying === true ) {

			this.source.loop = this.loop;

		}

		return this;

	},

	getVolume: function () {

		return this.gain.gain.value;

	},

	setVolume: function ( value ) {

		this.gain.gain.setTargetAtTime( value, this.context.currentTime, 0.01 );

		return this;

	}

} );

export { Audio };

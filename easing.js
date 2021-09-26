(function () {
  let easingMenu;

  const pow = Math.pow;
  const sqrt = Math.sqrt;
  const sin = Math.sin;
  const cos = Math.cos;
  const PI = Math.PI;
  const c1 = 1.70158;
  const c2 = c1 * 1.525;
  const c3 = c1 + 1;
  const c4 = (2 * PI) / 3;
  const c5 = (2 * PI) / 4.5;

  const bounceOut = function (x) {
    const n1 = 7.5625;
    const d1 = 2.75;

    if (x < 1 / d1) {
      return n1 * x * x;
    } else if (x < 2 / d1) {
      return n1 * (x -= 1.5 / d1) * x + 0.75;
    } else if (x < 2.5 / d1) {
      return n1 * (x -= 2.25 / d1) * x + 0.9375;
    } else {
      return n1 * (x -= 2.625 / d1) * x + 0.984375;
    }
  };

  const easingsFunctions = {
    easeInQuad: function (x) {
      return x * x;
    },
    easeOutQuad: function (x) {
      return 1 - (1 - x) * (1 - x);
    },
    easeInOutQuad: function (x) {
      return x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2;
    },
    easeInCubic: function (x) {
      return x * x * x;
    },
    easeOutCubic: function (x) {
      return 1 - pow(1 - x, 3);
    },
    easeInOutCubic: function (x) {
      return x < 0.5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2;
    },
    easeInQuart: function (x) {
      return x * x * x * x;
    },
    easeOutQuart: function (x) {
      return 1 - pow(1 - x, 4);
    },
    easeInOutQuart: function (x) {
      return x < 0.5 ? 8 * x * x * x * x : 1 - pow(-2 * x + 2, 4) / 2;
    },
    easeInQuint: function (x) {
      return x * x * x * x * x;
    },
    easeOutQuint: function (x) {
      return 1 - pow(1 - x, 5);
    },
    easeInOutQuint: function (x) {
      return x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2;
    },
    easeInSine: function (x) {
      return 1 - cos((x * PI) / 2);
    },
    easeOutSine: function (x) {
      return sin((x * PI) / 2);
    },
    easeInOutSine: function (x) {
      return -(cos(PI * x) - 1) / 2;
    },
    easeInExpo: function (x) {
      return x === 0 ? 0 : pow(2, 10 * x - 10);
    },
    easeOutExpo: function (x) {
      return x === 1 ? 1 : 1 - pow(2, -10 * x);
    },
    easeInOutExpo: function (x) {
      return x === 0
        ? 0
        : x === 1
          ? 1
          : x < 0.5
            ? pow(2, 20 * x - 10) / 2
            : (2 - pow(2, -20 * x + 10)) / 2;
    },
    easeInCirc: function (x) {
      return 1 - sqrt(1 - pow(x, 2));
    },
    easeOutCirc: function (x) {
      return sqrt(1 - pow(x - 1, 2));
    },
    easeInOutCirc: function (x) {
      return x < 0.5
        ? (1 - sqrt(1 - pow(2 * x, 2))) / 2
        : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2;
    },
    easeInBack: function (x) {
      return c3 * x * x * x - c1 * x * x;
    },
    easeOutBack: function (x) {
      return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2);
    },
    easeInOutBack: function (x) {
      return x < 0.5
        ? (pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
        : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
    },
    easeInElastic: function (x) {
      return x === 0
        ? 0
        : x === 1
          ? 1
          : -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4);
    },
    easeOutElastic: function (x) {
      return x === 0
        ? 0
        : x === 1
          ? 1
          : pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1;
    },
    easeInOutElastic: function (x) {
      return x === 0
        ? 0
        : x === 1
          ? 1
          : x < 0.5
            ? -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2
            : (pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5)) / 2 + 1;
    },
    easeInBounce: function (x) {
      return 1 - bounceOut(1 - x);
    },
    easeOutBounce: bounceOut,
    easeInOutBounce: function (x) {
      return x < 0.5
        ? (1 - bounceOut(1 - 2 * x)) / 2
        : (1 + bounceOut(2 * x - 1)) / 2;
    },
  };

  Plugin.register('easing', {
    title: 'Animation easing',
    author: 'stirante',
    description: 'This plugin can bake custom easing functions',
    icon: 'bar_chart',
    version: '0.0.1',
    variant: 'both',
    onload() {
      let easings = [];
      Object.keys(easingsFunctions).forEach(key => {
        let name = key.replace(/([A-Z])/g, " $1");
        name = name.charAt(0).toUpperCase() + name.slice(1);
        easings.push({
          name: name,
          click: () => easeKeyframes(easingsFunctions[key])
        })
      })
      easingMenu = new Action('easing', {
        name: 'Animation easing',
        icon: 'storefront',
        category: 'animation',
        condition: {modes: ['animate']},
        children: easings,
        click: event => {
          new Menu(easings).open(event);
        }
      })
      MenuBar.addAction(easingMenu, 'animation')
    },
    onunload() {
      easingMenu.delete()
    }
  });

  function easeKeyframes(easeFun) {
    if (Timeline.selected.length === 0) {
      Blockbench.showMessage('No keyframes selected', 'center')
      return;
    }
    if (Timeline.selected.length === 1) {
      Blockbench.showMessage('Not enough keyframes selected', 'center')
      return;
    }
    let target_keyframes = Timeline.selected.slice();
    let keyframes = Timeline.selected.slice();
    Undo.initEdit({keyframes});
    let animators = [];
    Timeline.selected.forEach(kf => animators.safePush(kf.animator));
    let channels = ['rotation', 'position', 'scale'];
    let props = ['x', 'y', 'z'];
    let step = 1 / Animation.selected.snapping || 0.1;

    animators.forEach(animator => {
      channels.forEach(channel => {
        if (!animator[channel]) return;
        let kfs = animator[channel].filter(kf => target_keyframes.includes(kf));
        if (kfs.length < 2) return;
        kfs.sort((a, b) => a.time - b.time);
        for (let i = 0; i < kfs.length - 1; i++) {
          let first = kfs[i];
          let last = kfs[i + 1];
          let [min, max] = [first.time, last.time];
          let new_keyframes = [];
          for (let time = min; time <= max; time += step) {
            let keyframe = kfs.find(kf => Math.epsilon(kf.time, time, 0.006));

            if (!keyframe) {
              keyframe = new Keyframe({
                channel, time
              })
              animator.fillValues(keyframe, null, true, false);
              new_keyframes.push(keyframe);
            }
            keyframe.interpolation = 'linear';
            let progress = easeFun((time - min) / (max - min));
            props.forEach(prop => {
              let from = first.get(prop);
              let to = last.get(prop);
              keyframe.set(prop, from + ((to - from) * progress));
            });
          }
          new_keyframes.forEach(kf => {
            animator[channel].push(kf);
            keyframes.push(kf);
            kf.animator = animator;
          })
        }
      })
    });
    TickUpdates.keyframes = true;
    Animator.preview();

    Undo.finishEdit('easing');
  }

})();

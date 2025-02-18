import { Spine } from '@esotericsoftware/spine-pixi-v8';
import * as PIXI from 'pixi.js';

const DEFAULT_CANVAS_SIZE = 1024;

export async function createBattleUnitPreviewPixiApp() {
  console.log('🎮 Loading PixiJS and Spine...');

  // Create canvas element
  const canvas = document.createElement('canvas');
  console.log('🎨 Creating PixiJS application...');
  const app = new PIXI.Application();

  // Initialize the application with our configuration
  await app.init({
    canvas,
    width: DEFAULT_CANVAS_SIZE,
    height: DEFAULT_CANVAS_SIZE,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    backgroundColor: 0x2c3e50,
    antialias: true,
  });

  let currentSpine: Spine | null = null;
  let currentResizeHandler: (() => void) | null = null;

  const loadModel = async (
    _skeletonPath: string,
    _atlasPath: string = _skeletonPath.replace(/\.(txt|json)$/, '.atlas')
  ) => {
    try {
      console.log('🎨 Loading spine model:', _skeletonPath);

      // Clean up previous spine if it exists
      if (currentSpine) {
        app.stage.removeChild(currentSpine);
        currentSpine = null;
      }

      if (currentResizeHandler) {
        window.removeEventListener('resize', currentResizeHandler);
        currentResizeHandler = null;
      }

      // Convert spine path to atlas path
      const fullSpinePath = _skeletonPath;
      const fullAtlasPath = _atlasPath;

      // Add and load assets
      const spineAlias = `spine_${Date.now()}`; // Unique alias to prevent caching issues
      const atlasAlias = `${spineAlias}_atlas`;

      PIXI.Assets.add({ alias: spineAlias, src: fullSpinePath });
      PIXI.Assets.add({ alias: atlasAlias, src: fullAtlasPath });

      console.log('🔄 Loading spine assets...');
      await PIXI.Assets.load([spineAlias, atlasAlias]);

      // Create spine animation
      console.log('🎭 Creating spine animation...');
      const model = Spine.from({ skeleton: spineAlias, atlas: atlasAlias, scale: 0.5, autoUpdate: true });

      // Set up animation
      model.state.data.defaultMix = 0.2;
      // model.state.setAnimation(1, 'Run', true);
      console.log('🎬 spine model instance:', model);

      // Center the spine object
      const centerSpine = () => {
        model.x = app.screen.width / 2;
        model.y = app.screen.height / 2 + model.getBounds().height / 2;
      };

      centerSpine();
      currentResizeHandler = centerSpine;
      window.addEventListener('resize', centerSpine);

      // Add to stage
      app.stage.addChild(model);
      currentSpine = model;

      console.log('✨ Spine model loaded successfully!');
    } catch (error) {
      console.error('❌ Error loading spine model:', error);
      throw error;
    }
  };

  console.log('✨ Preview app initialized!');

  return {
    app,
    canvas,
    loadModel,
    destroy: () => {
      if (currentResizeHandler) {
        window.removeEventListener('resize', currentResizeHandler);
      }
      app.destroy(true);
    },
  };
}

export type BattleUnitPreviewApp = Awaited<ReturnType<typeof createBattleUnitPreviewPixiApp>>;

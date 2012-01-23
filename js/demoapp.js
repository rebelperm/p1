 
 $(document).ready(function() {
 		//делаем глобальными все переменные, с которыми будем работать в других функциях
 		var container, camera, scene, renderer, floormesh, cubeMesh, phi = 0; 

 		init();
 		animate();


 		function init()
 		{
 				//создаем элемент и вставляем его в тело документа
				container = $( 'div' ).attr('id','cardfield');
				$('body').append( container );

				//создаем камеру
				camera = new THREE.TrackballCamera({
					fov: 45, 
					aspect: window.innerWidth / window.innerHeight,
					near: 1,
					far: 10000, 
					rotateSpeed: 1.0,
					zoomSpeed: 1.2,
					panSpeed: 0.8, 
					noZoom: false,
					noPan: false						
				});


				//устанавливаем камере позицию, немного разворачиваем её, чтобы она смотрела на нашу плоскость
				camera.position.z = 250;
				camera.position.y = 175;
				camera.target.position.y = -75;

				//создаем сцену
				scene = new THREE.Scene();

				//создаем наш "пол". Это будет псевдокуб со сторонами в 600х600 и глубиной 5
				var floorgeo = new THREE.CubeGeometry(600,600,5);
				//создаем мэш для него с материалом заданного цвета и прозрачностью
				floormesh = new THREE.Mesh(floorgeo, new THREE.MeshBasicMaterial({color: 0x248C0F, opacity:0.9}));
				//устанавливаем позицию нашему полу
				floormesh.position.y = -200;
				//и разворачиваем его по оси х так, чтобы он был параллелен ей.
				floormesh.rotation.x = 90 * Math.PI / 180;
				//добавляем к сцене
				scene.addChild(floormesh);
				
				//обвертка для куба
				 var materials = [
				 //делаем каждую сторону своего цвета
					new THREE.MeshBasicMaterial( { color: 0xE01B4C }), // правая сторона
					new THREE.MeshBasicMaterial( { color: 0x34609E }), // левая сторона
					new THREE.MeshBasicMaterial( { color: 0x7CAD18 }), //верх
					new THREE.MeshBasicMaterial( { color: 0x00EDB2 }), // низ
					new THREE.MeshBasicMaterial( { color: 0xED7700 }), // лицевая сторона
					new THREE.MeshBasicMaterial( { color: 0xB5B1AE }) // задняя сторона
				];

				//создаем куб со стороной 50 и размерами сегментов 1, применяем к нему массив материалов
				var cube = new THREE.CubeGeometry( 50, 50, 50, 1, 1, 1, materials );
				//создаем мэш для куба, в качестве материала мэша 
				//будет браться тот, который применен к кубу
				cubeMesh = new THREE.Mesh( cube, new THREE.MeshFaceMaterial() );
				//указываем позицию по оси y
				cubeMesh.position.y = -10;
				//добавляем к сцене
				scene.addChild( cubeMesh );
 				//добавляем тень кубу
 				new THREE.ShadowVolume( cubeMesh );

 				//устанавливаем белый свет 
				light = new THREE.DirectionalLight( 0xffffff );
				//да, объекты должны отбрасывать тень
				light.castShadow = true;
				//сам пол у нас в -150, свет соотв. ставим выше (в 1 по y и 0 по x и z), чтобы он попадал на наш куб и заставлял его отбрасывать тень
				//напомню, что свет двигается от указанной точки к началу координат
				light.position.set( 0, 1, 0 );
				//добавлям свет
				scene.addChild( light ); 
 
				//рендерер 
				renderer = new THREE.WebGLRenderer();
				//устанавливаем ему размеры экрана
				renderer.setSize( window.innerWidth, window.innerHeight );
				//и добавляем в наш созданный элемент
				container.append( renderer.domElement );


 		}


 		function animate()
 		{
 			requestAnimationFrame(animate);
 			render();
 		}

 		function render()
 		{
 			//вращаем куб по всем трем осям (переменная мэша куба доступна глобально)
 			cubeMesh.rotation.x += 0.5 * Math.PI / 90;
			cubeMesh.rotation.y += 1.0 * Math.PI / 90;
			cubeMesh.rotation.z += 1.5 * Math.PI / 90;
			//двигаем куб по кругу
			cubeMesh.position.x = Math.sin( phi ) * 50;
			cubeMesh.position.y = Math.cos( phi ) * 50;
			//итерируем глобальную переменную
			phi+= 0.05;
			//рендерим
 			renderer.render(scene, camera);
 		}
});


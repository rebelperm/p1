 
 $(document).ready(function() {
 		//������ ����������� ��� ����������, � �������� ����� �������� � ������ ��������
 		var container, camera, scene, renderer, floormesh, cubeMesh, phi = 0; 

 		init();
 		animate();


 		function init()
 		{
 				//������� ������� � ��������� ��� � ���� ���������
				container = $( 'div' ).attr('id','cardfield');
				$('body').append( container );

				//������� ������
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


				//������������� ������ �������, ������� ������������� �, ����� ��� �������� �� ���� ���������
				camera.position.z = 250;
				camera.position.y = 175;
				camera.target.position.y = -75;

				//������� �����
				scene = new THREE.Scene();

				//������� ��� "���". ��� ����� ��������� �� ��������� � 600�600 � �������� 5
				var floorgeo = new THREE.CubeGeometry(600,600,5);
				//������� ��� ��� ���� � ���������� ��������� ����� � �������������
				floormesh = new THREE.Mesh(floorgeo, new THREE.MeshBasicMaterial({color: 0x248C0F, opacity:0.9}));
				//������������� ������� ������ ����
				floormesh.position.y = -200;
				//� ������������� ��� �� ��� � ���, ����� �� ��� ���������� ��.
				floormesh.rotation.x = 90 * Math.PI / 180;
				//��������� � �����
				scene.addChild(floormesh);
				
				//�������� ��� ����
				 var materials = [
				 //������ ������ ������� ������ �����
					new THREE.MeshBasicMaterial( { color: 0xE01B4C }), // ������ �������
					new THREE.MeshBasicMaterial( { color: 0x34609E }), // ����� �������
					new THREE.MeshBasicMaterial( { color: 0x7CAD18 }), //����
					new THREE.MeshBasicMaterial( { color: 0x00EDB2 }), // ���
					new THREE.MeshBasicMaterial( { color: 0xED7700 }), // ������� �������
					new THREE.MeshBasicMaterial( { color: 0xB5B1AE }) // ������ �������
				];

				//������� ��� �� �������� 50 � ��������� ��������� 1, ��������� � ���� ������ ����������
				var cube = new THREE.CubeGeometry( 50, 50, 50, 1, 1, 1, materials );
				//������� ��� ��� ����, � �������� ��������� ���� 
				//����� ������� ���, ������� �������� � ����
				cubeMesh = new THREE.Mesh( cube, new THREE.MeshFaceMaterial() );
				//��������� ������� �� ��� y
				cubeMesh.position.y = -10;
				//��������� � �����
				scene.addChild( cubeMesh );
 				//��������� ���� ����
 				new THREE.ShadowVolume( cubeMesh );

 				//������������� ����� ���� 
				light = new THREE.DirectionalLight( 0xffffff );
				//��, ������� ������ ����������� ����
				light.castShadow = true;
				//��� ��� � ��� � -150, ���� �����. ������ ���� (� 1 �� y � 0 �� x � z), ����� �� ������� �� ��� ��� � ��������� ��� ����������� ����
				//�������, ��� ���� ��������� �� ��������� ����� � ������ ���������
				light.position.set( 0, 1, 0 );
				//�������� ����
				scene.addChild( light ); 
 
				//�������� 
				renderer = new THREE.WebGLRenderer();
				//������������� ��� ������� ������
				renderer.setSize( window.innerWidth, window.innerHeight );
				//� ��������� � ��� ��������� �������
				container.append( renderer.domElement );


 		}


 		function animate()
 		{
 			requestAnimationFrame(animate);
 			render();
 		}

 		function render()
 		{
 			//������� ��� �� ���� ���� ���� (���������� ���� ���� �������� ���������)
 			cubeMesh.rotation.x += 0.5 * Math.PI / 90;
			cubeMesh.rotation.y += 1.0 * Math.PI / 90;
			cubeMesh.rotation.z += 1.5 * Math.PI / 90;
			//������� ��� �� �����
			cubeMesh.position.x = Math.sin( phi ) * 50;
			cubeMesh.position.y = Math.cos( phi ) * 50;
			//��������� ���������� ����������
			phi+= 0.05;
			//��������
 			renderer.render(scene, camera);
 		}
});


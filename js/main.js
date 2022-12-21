var IDGlobal;
var vartable;
$(document).ready(function() {    
	listarProductos();
	jQuery("#cancelarModal").on("click",function(){
		jQuery("#agregarRegistro").hide();
		jQuery("#datatableContainer").show();
	});  
	jQuery("#guardarModal").on("click", function(){
		guardarRegistro();
		vartable.ajax.reload();
	});
	//boton editar
	jQuery("#example tbody").on('click', '.btnEditar', function () {
		var vIDTarea = jQuery(this).attr("id");
		IDGlobal = vIDTarea;
		buscarDatosTarea(vIDTarea);
		jQuery("#agregarRegistro").modal("show");
        
	});
	//boton eliminar
	jQuery("#example tbody").on('click', '.btnEliminar', function () {
		var vIDTarea = jQuery(this).attr("id");
		IDGlobal = vIDTarea;
		eliminarTarea(vIDTarea);
		//como evitar tener que recargar pagina para actualizar registro?
        
	});
});

function listarProductos(){
    vartable=$('#example').DataTable({     
		"ajax": {
				"type":"POST",
				"url": "backend/registros.php", 
		        "data": {'paccion':'LISTAR'}
				},
		"destroy": true,
		"columns" : [
			{"data":"id"},
			{"data":"tarea"},
			{"data":"fecha_inicio"},
			{"data":"fecha_fin"},
			{"data":"detalles"},
			{"data":"prioridad"},
			{"data":"accion"}
		],
		"language": {
			"lengthMenu": "Mostrar _MENU_ registros",
			"zeroRecords": "No se encontraron resultados",
			"info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
			"infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
			"infoFiltered": "(filtrado de un total de _MAX_ registros)",
			"sSearch": "Buscar:",
			"oPaginate": {
				"sFirst": "Primero",
				"sLast":"Último",
				"sNext":"Siguiente",
				"sPrevious": "Anterior"
			 },
			 "sProcessing":"Procesando...",
		},
		"responsive": true,
		"dom": 'Bfrtilp',       
		"buttons":[ 
			{
				extend:    'excelHtml5',
				text:      '<i class="fas fa-file-excel"></i> ',
				titleAttr: 'Exportar a Excel',
				className: 'btn btn-success'
			},
			{
				extend:    'pdfHtml5',
				text:      '<i class="fas fa-file-pdf"></i> ',
				titleAttr: 'Exportar a PDF',
				className: 'btn btn-danger'
			},
			{
				extend:    'print',
				text:      '<i class="fa fa-print"></i> ',
				titleAttr: 'Imprimir',
				className: 'btn btn-info'
			},
			{
				text:      '<i id="btnAgregar" class="fas fa-plus"></i>',
				action: function(){
					jQuery("#btnAgregar").on("click",function(){
						jQuery("#agregarRegistro").modal("show");
					});
				},
				className:'btn btn-primary'
			},
		]	        		
    }); 
}
//funcion guardar registro
function guardarRegistro(){
	jQuery.ajax({
		type:"POST",
		url:"backend/registros.php",
		data:{'paccion': 'GUARDAR',
		      'pid':'',
			  'ptarea': jQuery("#tarea").val(),
			  'pfechainicio' : jQuery("#fechaFin").val(),
			  'pfechafin' : jQuery("#fechaInicio").val(),
			  'pdetalles': jQuery("#detalles").val(),
			  'pprioridad': jQuery("#prioridad").val()
        
		},
		dataType:'json',
		success:function(r){
		console.log(r.exito);
		console.log(r.textoerror);
		},
		error:function(a,b,c){
		console.log(r.exito);
		console.log(r.textoerror);
		}
	})
}

function eliminarTarea(vIDTarea){
    jQuery.ajax({
        type:"POST",        
        url: "backend/registros.php",
        data:{'paccion':'ELIMINAR',
              'pid':vIDTarea,
			  'ptarea':'',
			  'pfechainicio' :'',
			  'pfechafin' :'' ,
			  'pdetalles':'',
			  'pprioridad': ''
            },
        dataType:'json',
        success: function(r){
          console.log(r.exito);
          console.log(r.textoerror);
        },
        error:function(a,b,c){
          console.log(r.exito);
          console.log(r.textoerror);
        }
    });
}

function actualizarDatos(){
	jQuery.ajax({
		type:"POST",        
		url: "backend/registros.php",
		data:{'paccion':'ACTUALIZAR',
				'pid':vIDTarea,
				'ptarea':jQuery("#tarea").val(),
				'pfechainicio':jQuery("#fechaInicio").val(),
				'pfechafin':jQuery("#fechaFin").val(),
				'pdetalles':jQuery("#detalles").val(),
				'pprioridad':jQuery("#prioridad").val()
			},
		dataType:'json',
		success: function(r){
			alert(r.textoerror);
			window.location="../index.html";
		},
		error:function(a,b,c){
			alert("NO SE PUDO CONECTAR CON EL SERVIDOR...");
		}
	});
}

function buscarDatosTarea(vIDTarea){
	jQuery.ajax({
		type:"POST",        
		url: "backend/registros.php",
		data:{'paccion':'BUSCAR_TAREA',
				'pid':vIDTarea,
				'ptarea':'',
				'pfechainicio' :'',
				'pfechafin' :'' ,
				'pdetalles':'',
				'pprioridad': ''
			},
		dataType:'json',
		success: function(datos){
			jQuery("#tarea").val(datos[0].tarea);
			jQuery("#fechaInicio").val(datos[0].fecha_inicio);
			jQuery("#fechaFin").val(datos[0].fecha_fin);
			jQuery("#detalles").val(datos[0].detalles);
			jQuery("#prioridad").val(datos[0].prioridad);
		},
		error:function(a,b,c){
			alert("NO SE PUDO CONECTAR CON EL SERVIDOR...");
		}
	});
}

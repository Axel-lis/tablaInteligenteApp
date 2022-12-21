<?php
include './conexion.php';
class Respuesta {
public $exito;
public $textoerror;
public $idgenerado;
}
$respuesta= new Respuesta();

$acc=$_POST['paccion'];

//Funcion guardar
function guardar($conexion,$pri,$tar,$fini, $ffin, $det, $respuesta){
    $sql = "INSERT INTO tareas (tarea, fecha_inicio, fecha_fin, detalles,prioridad) VALUES ('{$tar}','{$fini}','{$ffin}','{$det}','{$pri}')";
    $sql = $conexion->prepare($sql);
    $sql->execute();
    
    $respuesta->exito = "S";
    $respuesta->textoerror = "el registro ha sido guardado";
    $respuesta->idgenerado = $conexion->lastInsertId();
    echo json_encode($respuesta);
}
//Funcion eliminar
function eliminar($conexion,$id){
    $sql = "DELETE FROM tareas WHERE tareas.id = '{$id}'";
    $sql = $conexion->prepare($sql);
    $sql->execute();
}
//funcion buscar
function buscar($conexion,$id){
  $sentencia= $conexion->query("SELECT * FROM tareas WHERE tareas.id = '{$id}'");
  $productos= $sentencia->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($productos);
}
//funcion actualizar
function actualizar($conexion,$id, $tar,$fini,$ffin,$det,$pri){
  $sql = "UPDATE tareas SET tarea='{$tar}', detalles='{$det}', fecha_inicio='{$fini}' , fecha_fin='{$ffin}', prioridad='{$pri}' WHERE tareas.id = '{$id}'";
  $sql = $conexion->prepare($sql);
  $sql->execute();
}
//funcion listar
function listar($conexion){
    $sentencia= $conexion->query("SELECT * FROM tareas");
    $productos= $sentencia->fetchAll(PDO::FETCH_ASSOC);

    $tabla="";
    foreach ($productos as $row) {
      $id=$row['id'];
      $acciones="<button type='button' id='".$id."'class='btn btn-warning btnEditar'><i class='fas fa-edit'></i></button>";
      $acciones.="<button type='button' id='".$id."' class='btn btn-danger btnEliminar'><i class='far fa-trash-alt'></i></button>";
      $tar=$row['tarea'];
      $fini=$row['fecha_inicio'];
      $ffin=$row['fecha_fin'];
      $det=$row['detalles'];
      $pri=$row['prioridad'];
      $tabla.='{"id":"'.$id.'","tarea":"'.$tar.'","fecha_inicio":"'.$fini.'","fecha_fin":"'.$ffin.'","detalles":"'.$det.'","prioridad":"'.$pri.'","accion":"'.$acciones.'"}'.',';
    }
    $tabla=substr($tabla, 0, strlen($tabla) - 1);
    echo '{"data":['.$tabla.']}';
    /*
    $productos= $sentencia->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($productos);
    */

}
if($conexion){
    if($acc=="LISTAR"){
      listar($conexion);
      
    }
    if($acc=="GUARDAR"){
      $tar=$_POST['ptarea'];
      $fini=$_POST['pfechainicio'];
      $ffin=$_POST['pfechafin'];
      $det=$_POST['pdetalles'];
      $pri =$_POST['pprioridad'];
      guardar($conexion,$pri,$tar,$fini, $ffin, $det, $respuesta);
    }
    if($acc=="ELIMINAR"){
      $id=$_POST['pid'];
      eliminar($conexion,$id);
      $respuesta->exito = "S";
      $respuesta->textoerror = "el prod ha sido eliminado";
      echo json_encode($respuesta);
    }
    if($acc=="BUSCAR_TAREA"){
      $id=$_POST['pid'];
      buscar($conexion,$id);
    }
    if($acc=="ACTUALIZAR"){
      $tar=$_POST['ptarea'];
      $fini=$_POST['pfechainicio'];
      $ffin=$_POST['pfechafin'];
      $det=$_POST['pdetalles'];
      $pri =$_POST['pprioridad'];
      actualizar($conexion,$pri,$tar,$fini, $ffin, $det, $respuesta);
      $respuesta->exito = "S";
      $respuesta->textoerror = "el prod ha sido actualizado";
      echo json_encode($respuesta);
    }
    

  }else{
    $respuesta->exito = "N";
    $respuesta->textoerror = "no conecto";
    echo json_encode($respuesta);
}
?>
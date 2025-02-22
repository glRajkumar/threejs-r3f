"use client";

import { BoxGeometry, Shape as ThreeShape, Vector2 } from 'three';
import { Wrapper, Mesh } from "../wrapper";

export function Octahedron() {
  return (
    <Wrapper>
      <Mesh>
        <octahedronGeometry args={[1]} />
      </Mesh>
    </Wrapper>
  )
}

export function Tetrahedron() {
  return (
    <Wrapper>
      <Mesh>
        <tetrahedronGeometry args={[1]} />
      </Mesh>
    </Wrapper>
  )
}

export function Ring() {
  return (
    <Wrapper>
      <Mesh>
        <ringGeometry args={[0.5, 1, 32]} />
      </Mesh>
    </Wrapper>
  )
}

export function Edges() {
  return (
    <Wrapper>
      <Mesh>
        <lineSegments>
          <edgesGeometry args={[new BoxGeometry(1, 1, 1)]} />
          <lineBasicMaterial color="white" />
        </lineSegments>
      </Mesh>
    </Wrapper>
  )
}

export function Extrude() {
  const shape = new ThreeShape();
  shape.moveTo(0, 0);
  shape.lineTo(0, 1);
  shape.lineTo(1, 1);
  shape.lineTo(1, 0);
  shape.lineTo(0, 0);

  return (
    <Wrapper>
      <Mesh>
        <extrudeGeometry args={[shape, { depth: 1, bevelEnabled: false }]} />
      </Mesh>
    </Wrapper>
  )
}

export function Lathe() {
  const points = [];
  for (let i = 0; i < 10; i++) {
    points.push(new Vector2(Math.sin(i * 0.2) * 10 + 5, (i - 5) * 2))
  }

  return (
    <Wrapper camera={{ position: [20, 10, 20], fov: 50 }}>
      <Mesh>
        <latheGeometry args={[points, 40, 0, 10]} />
      </Mesh>
    </Wrapper>
  )
}

export function Polyhedron() {
  const vertices = [1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1]
  const indices = [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1]

  return (
    <Wrapper>
      <Mesh>
        <polyhedronGeometry args={[vertices, indices, 1, 2]} />
      </Mesh>
    </Wrapper>
  )
}

export function Shape() {
  const shape = new ThreeShape();
  shape.moveTo(0, 0);
  shape.lineTo(0, 1);
  shape.lineTo(1, 1);
  shape.lineTo(1, 0);
  shape.lineTo(0, 0);

  return (
    <Wrapper>
      <Mesh>
        <shapeGeometry args={[shape]} />
      </Mesh>
    </Wrapper>
  )
}

export function Wireframe() {
  return (
    <Wrapper>
      <Mesh>
        <wireframeGeometry args={[new BoxGeometry(1, 1, 1)]} />
        <lineBasicMaterial color="red" />
      </Mesh>
    </Wrapper>
  )
}
